import bcrypt
import bottle
import datetime

from bottle.ext import sqlalchemy
from bottlejwt import JwtPlugin
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

Base = declarative_base()
engine = create_engine('sqlite:///:memory:', echo=True)

app = bottle.Bottle()

plugin = sqlalchemy.Plugin(
    engine,
    Base.metadata,
    keyword='db',
    create=True,
    commit=True,
    use_kwargs=False
)

app.install(plugin)

def validation(auth, auth_value):

    if 'exp' not in auth:
        return False

    current_time = int(datetime.datetime.utcnow().timestamp())
    expiration_time = int(auth['exp'])

    return current_time < expiration_time

@app.post("/login")
def login(db):
    body = bottle.request.json
    email = body["email"]
    password = body["password"]

    user = session.query(User).filter(User.email == email).first()

    authenticated = bcrypt.checkpw(password.encode(), user.password_hash)

    if authenticated:
        return  JwtPlugin.encode(
            {
                'id': user.id,
                'exp': (datetime.datetime.utcnow() + datetime.timedelta(seconds= 60 * 10000)).timestamp()
            }
        )
    else:
        bottle.response.status = 401
        return {'error': 'invalid username or password'}

@app.post("/<user>/collection/", auth="any values and types")
def add_collection(user,auth):
    print("add_collection({}, {})".format(user, auth))
    user = session.query(User).filter(User.display_name == user).first()
    print("Query finished, user = {}".format(repr(user)))

    if not user:
        bottle.response.status = 404
        return {"error": "User not found"}

    logged_in_user = session.query(User).filter(User.id == auth["id"]).first()

    if not logged_in_user:
        bottle.response.status = 403
        return {"error": "Request denied"}

    body = bottle.request.json

    name_missing = "name" not in body
    description_missing = "description" not in body


    if name_missing or description_missing:
        bottle.response.status = 400
        return {"error": "Missing required parameters."}

    name = body["name"]
    description = body["description"]

    already_exists = session.query(Collection).filter(Collection.name == name).first()

    if already_exists:
        bottle.response.status = 400
        return {"error": "There is already a collection with that name."}

    new_collection =Collection(user=user, name = name, description = description)

    session.add(new_collection)
    session.commit()

    return { "id": new_collection.id }

    # user id from the auth token does not match the user specified

@app.get("/<user>/collection/", auth="any values and types")
def example(user):
    user = session.query(User).filter(User.display_name == user).first()


    result = {}

    if not user:
        bottle.response.status = 404
        return {"error": "User not found"}

    for collection in user.collections:
      result[ collection.name] = { "id": collection.id, "name": collection.name, "description": collection.description }

    return result


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String)
    display_name = Column(String)
    password_hash = Column(String)
    collections = relationship("Collection", back_populates="user")
    def __repr__(self):
        return "<User(id ='{}', email = '{}', display_name = '{}'>".format(self.id, self.email, self.display_name)


class Collection(Base):
    __tablename__ = 'collection'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    name = Column(String)
    description = Column(String)

    user = relationship("User", back_populates="collections")


Session = sessionmaker(bind=engine)

session=Session()
Base.metadata.create_all(engine)

TimBob = User(email='tbob@place.com', display_name='TimBob', password_hash=bcrypt.hashpw('TimPass'.encode(), bcrypt.gensalt()))

session.add(TimBob)
session.add(User(email='bbob@place.com', display_name='Paul Bob', password_hash=bcrypt.hashpw('PaulPass'.encode(), bcrypt.gensalt())))
session.add(User(email='jbob@place.com', display_name='John Bob', password_hash=bcrypt.hashpw('JohnPass'.encode(), bcrypt.gensalt())))
session.add(User(email='rbob@place.com', display_name='Rue Bob', password_hash=bcrypt.hashpw('RuePass'.encode(), bcrypt.gensalt())))

fossil_collection = Collection(user = TimBob, name="Fossils", description="Some fossils")

session.add(fossil_collection)

session.commit()

app.install(JwtPlugin(validation, 'secret', algorithm='HS256'))
app.run(host="0.0.0.0", port="9988")
