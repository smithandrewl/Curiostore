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


def get_user_by_name(name):
    """
    Searches for a user by display name and returns it or None.
    :param name: The display name of the user to search for
    :return: The matching user if found, or None otherwise.
    """
    return session.query(User).filter(User.display_name == name).first()

def get_collection_by_name(name):
    """
    Searches for a collection by name and returns it or None.
    :param name: The name of the collection to search for
    :return: The matching collection if found, or None otherwise.
    """
    return session.query(Collection).filter(Collection.name == name).first()

def is_user_logged_in(auth, user):
    """
    Returns whether or not the specified user is the currently logged in user.
    :param auth: The JWT token sent by the client.
    :param user: The display name of the user we want to verify is logged in.
    :return: Whether or not the specified user is logged in according to the JWT token.
    """
    user_record = get_user_by_name(user)

    if not user_record:
        return False

    return user_record.id == auth["id"]

def validation(auth, auth_value):
    """
    Determines whether or not the JWT is valid.
    :param auth: The JWT token.
    :param auth_value: Passed in by the bottle jwt plugin.
    :return: Returns whether or not the JWT token is valid.
    """

    if 'exp' not in auth:
        return False

    current_time = int(datetime.datetime.utcnow().timestamp())
    expiration_time = int(auth['exp'])

    return current_time < expiration_time

###################### Begin API Endpoints #############################
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

@app.get("/<user>/collection/<name>", auth="any values and types")
def get_collection(user, name, auth):
    user = get_user_by_name(user)

    if not user:
        bottle.response.status = 404
        return {"error": "User not found"}

    if not is_user_logged_in(auth, user.display_name):
        bottle.response.status = 403
        return {"error": "Request denied"}

    collection = get_collection_by_name(name)

    if not collection:
        bottle.response.status = 404
        return {"error": "Collection not found"}

    return {"id": collection.id, "name": collection.name, "description": collection.description}

@app.post("/<user>/collection/<name>", auth="any values and types")
def update_collection(user, name, auth):
    user = get_user_by_name(user)

    if not user:
        bottle.response.status = 404
        return {"error": "User not found"}

    if not is_user_logged_in(auth, user.display_name):
        bottle.response.status = 403
        return {"error": "Request denied"}

    collection = get_collection_by_name(name)

    if not collection:
        bottle.response.status = 404
        return {"error": "Collection not found"}

    body = bottle.request.json

    name_missing = "name" not in body
    description_missing = "description" not in body

    if name_missing or description_missing:
        bottle.response.status = 400
        return {"error": "Missing required parameters"}

    collection_name = body["name"]
    collection_description = body["description"]

    collection.name = collection_name
    collection.description = collection_description

    session.commit()


@app.delete("/<user>/collection/<collection>", auth="any values and types")
def delete_collection(user, collection, auth):
    user = get_user_by_name(user)

    if not user:
        bottle.response.status = 404
        return {"error": "User not found"}

    if not is_user_logged_in(auth, user.display_name):
        bottle.response.status = 403
        return {"error": "Request denied"}

    collection_record = get_collection_by_name(collection)
    collection_not_found = not collection_record

    if collection_not_found:
        bottle.response.status = 404
        return {"error": "Collection not found"}

    session.delete(collection_record)
    session.commit()

@app.post("/<user>/collection/", auth="any values and types")
def add_collection(user,auth):
    user = get_user_by_name(user)

    if not user:
        bottle.response.status = 404
        return {"error": "User not found"}

    if not is_user_logged_in(auth, user.display_name):
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

    already_exists = get_collection_by_name(name)

    if already_exists:
        bottle.response.status = 400
        return {"error": "There is already a collection with that name."}

    new_collection =Collection(user=user, name = name, description = description)

    session.add(new_collection)
    session.commit()

    return { "id": new_collection.id }

    # user id from the auth token does not match the user specified

@app.get("/<user>/collection/", auth="any values and types")
def example(user,auth):
    user = get_user_by_name(user)

    if not user:
        bottle.response.status = 404
        return {"error": "User not found"}

    if not is_user_logged_in(auth, user.display_name):
        bottle.response.status = 403
        return {"error": "Request denied"}

    result = {}

    for collection in user.collections:
      result[ collection.name] = {
          "id": collection.id,
          "name": collection.name,
          "description": collection.description
      }

    return result
####################### End API Endpoints ##############################


###################### Begin SQLAlchemy Models #############################
class User(Base):
    """
    The model class representing user accounts.
    """

    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String)
    display_name = Column(String)
    password_hash = Column(String)
    collections = relationship("Collection", back_populates="user")
    def __repr__(self):
        return "<User(id ='{}', email = '{}', display_name = '{}'>".format(self.id, self.email, self.display_name)


class Collection(Base):
    """
    The model class representing a single collection belonging to a single user account.
    """
    __tablename__ = 'collection'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    name = Column(String)
    description = Column(String)

    user = relationship("User", back_populates="collections")
    items = relationship("Item", back_populates="collection")

class Item(Base):
    __tablename__ = 'item'

    id = Column(Integer, primary_key=True)
    collection_id = Column(Integer, ForeignKey("collection.id"))
    name = Column(String)
    description = Column(String)

    collection = relationship("Collection", back_populates="items")

###################### End SQLAlchemy Models #############################

Session = sessionmaker(bind=engine)

session=Session()
Base.metadata.create_all(engine)



###################### Begin Test Data Insertion #############################
TimBob = User(
    email='tbob@place.com',
    display_name='TimBob',
    password_hash=bcrypt.hashpw('TimPass'.encode(), bcrypt.gensalt())
)
session.add(TimBob)

session.add(
    User(
        email='bbob@place.com',
        display_name='Paul Bob',
        password_hash=bcrypt.hashpw('PaulPass'.encode(), bcrypt.gensalt())
    )
)

session.add(
    User(
        email='jbob@place.com',
        display_name='John Bob',
        password_hash=bcrypt.hashpw('JohnPass'.encode(), bcrypt.gensalt())
    )
)

session.add(
    User(
        email='rbob@place.com',
        display_name='Rue Bob',
        password_hash=bcrypt.hashpw('RuePass'.encode(), bcrypt.gensalt())
    )
)

fossil_collection = Collection(
    user = TimBob,
    name="Fossils",
    description="Some fossils"
)
session.add(fossil_collection)
session.commit()
###################### End Test Data Insertion #############################

app.install(JwtPlugin(validation, 'secret', algorithm='HS256'))
app.run(host="0.0.0.0", port="9988")
