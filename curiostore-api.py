import bcrypt
import bottle
import datetime

from bottle.ext import sqlalchemy
from bottlejwt import JwtPlugin
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

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
                'exp': (datetime.datetime.utcnow() + datetime.timedelta(seconds= 60 * 5)).timestamp()
            }
        )
    else:
        bottle.response.status = 401
        return {'error': 'invalid username or password'}


@app.get("/", auth="any values and types")
def example(auth):  # auth argument is optional!
    return "ok"

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String)
    display_name = Column(String)
    password_hash = Column(String)

    def __repr__(self):
        return "<User(id ='{}', email = '{}', display_name = '{}'>".format(self.id, self.email, self.display_name)


Session = sessionmaker(bind=engine)

session=Session()
Base.metadata.create_all(engine)

session.add(User(email='tbob@place.com', display_name='Tim Bob', password_hash=bcrypt.hashpw('TimPass'.encode(), bcrypt.gensalt())))
session.add(User(email='bbob@place.com', display_name='Paul Bob', password_hash=bcrypt.hashpw('PaulPass'.encode(), bcrypt.gensalt())))
session.add(User(email='jbob@place.com', display_name='John Bob', password_hash=bcrypt.hashpw('JohnPass'.encode(), bcrypt.gensalt())))
session.add(User(email='rbob@place.com', display_name='Rue Bob', password_hash=bcrypt.hashpw('RuePass'.encode(), bcrypt.gensalt())))
session.commit()

app.install(JwtPlugin(validation, 'secret', algorithm='HS256'))
app.run(host="0.0.0.0", port="9988")
