import bottle
from bottle.ext import sqlalchemy
from bottle import get, install, run
from bottlejwt import JwtPlugin
from sqlalchemy import create_engine, Column, Integer, String
import json
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

@app.get("/create")
def create(db):
    user = db.query(User).first()
    return {'id': user.id, 'email': user.email, 'display_name': user.display_name, 'password_hash': user.password_hash}
    return JwtPlugin.encode({'name': 'pepito'})

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
        return "<User(id ='{}', email = '{}', display_name = '{}', password_hash = '{}'>".format(self.id, self.email, self.display_name, self.password_hash)


Session = sessionmaker(bind=engine)

session=Session()
Base.metadata.create_all(engine)

session.add(User(email='tbobs@place.com', display_name='Tom Bob', password_hash='No'))
session.commit()

app.install(JwtPlugin(validation, 'secret', algorithm='HS256'))
app.run(host="0.0.0.0", port="9988")
