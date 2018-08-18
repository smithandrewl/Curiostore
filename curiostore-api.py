import bcrypt
import bottle
from bottle.ext import sqlalchemy
from bottlejwt import JwtPlugin
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()
engine = create_engine('sqlite:///:memory:', echo=True)

app = bottle.Bottle()
plugin = sqlalchemy.Plugin(
    engine, # SQLAlchemy engine created with create_engine function.
    Base.metadata, # SQLAlchemy metadata, required only if create=True.
    keyword='db', # Keyword used to inject session database in a route (default 'db').
    create=True, # If it is true, execute `metadata.create_all(engine)` when plugin is applied (default False).
    commit=True, # If it is true, plugin commit changes after route is executed (default True).
    use_kwargs=False # If it is true and keyword is not defined, plugin uses **kwargs argument to inject session database (default False).
)

app.install(plugin)

def validation(auth, auth_value):
    print(auth, auth_value)
    return True

@app.post("/login")
def login(db):
    body = bottle.request.json
    email = body["email"]
    password = body["password"]

    user = session.query(User).filter(User.email == email).first()

    authenticated = bcrypt.checkpw(password.encode(), user.password_hash)

    if authenticated:
        return  JwtPlugin.encode({'id': user.id})
    else:
        bottle.response.status = 401
        return {'error': 'invalid username or password'}


@app.get("/create")
def create(db):
    users = db.query(User).all()

    result = {}

    for user in users:
        result[user.id] = {'id': user.id, 'email': user.email, 'display_name': user.display_name}

    return result

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
