import bcrypt
import bottle
import datetime

from bottle.ext import sqlalchemy
from bottlejwt import JwtPlugin
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

from model import engine, Base, Item, Collection, User, Session, get_user_by_name, is_user_logged_in, \
    get_collection_by_name, get_item_by_name

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
    user = get_user_by_name(session, user)

    if not user:
        return error_user_not_found()

    if not is_user_logged_in(session, auth, user.display_name):
        return error_request_denied()

    collection = get_collection_by_name(session, name)

    if not collection:
        return error_not_found("Collection")

    return {"id": collection.id, "name": collection.name, "description": collection.description}


def error_not_found(entity):
    bottle.response.status = 404
    return {"error": "{} not found".format(entity)}


def error_request_denied():
    bottle.response.status = 403
    return {"error": "Request denied"}


def error_user_not_found():
    bottle.response.status = 404
    return {"error": "User not found"}


@app.post("/<user>/collection/<name>", auth="any values and types")
def update_collection(user, name, auth):
    user = get_user_by_name(session, user)

    if not user:
        return error_user_not_found()

    if not is_user_logged_in(session, auth, user.display_name):
        return error_request_denied()

    collection = get_collection_by_name(session, name)

    if not collection:
        return error_not_found("Collection")

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
    user = get_user_by_name(session, user)

    if not user:
        return error_user_not_found()

    if not is_user_logged_in(session, auth, user.display_name):
        return error_request_denied()

    collection_record = get_collection_by_name(session, collection)
    collection_not_found = not collection_record

    if collection_not_found:
        return error_not_found("Collection")

    session.delete(collection_record)
    session.commit()

@app.post("/<user>/collection/", auth="any values and types")
def add_collection(user,auth):
    user = get_user_by_name(session, user)

    if not user:
        return error_user_not_found()

    if not is_user_logged_in(session, auth, user.display_name):
        return error_request_denied()

    body = bottle.request.json

    name_missing = "name" not in body
    description_missing = "description" not in body


    if name_missing or description_missing:
        bottle.response.status = 400
        return {"error": "Missing required parameters."}

    name = body["name"]
    description = body["description"]

    already_exists = get_collection_by_name(session, name)

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
    user = get_user_by_name(session, user)

    if not user:
        return error_user_not_found()

    if not is_user_logged_in(session, auth, user.display_name):
        return error_request_denied()

    result = {}

    for collection in user.collections:
      result[ collection.name] = {
          "id": collection.id,
          "name": collection.name,
          "description": collection.description
      }

    return result

@app.get("/<user>/collection/<collection_name>/<item_name>", auth="any values and types")
def get_item(user, collection_name, item_name, auth):
    user = get_user_by_name(session, user)

    if not user:
        return error_user_not_found()

    if not is_user_logged_in(session, auth, user.display_name):
        return error_request_denied()


    collection = get_collection_by_name(session, collection_name)

    if not collection:
        return error_not_found("Collection")


    item = get_item_by_name(session, user.display_name, collection.name, item_name)

    if not item:
        return error_not_found("Item")

    return {
        "id": item.id,
        "name": item.name,
        "description": item.description
    }
####################### End API Endpoints ##############################



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

RueBob =  User(
    email='rbob@place.com',
    display_name='Rue Bob',
    password_hash=bcrypt.hashpw('RuePass'.encode(), bcrypt.gensalt())
)
session.add(RueBob)

fossil_collection = Collection(
    user = RueBob,
    name="Fossils",
    description="Some fossils"
)
session.add(fossil_collection)

fossil = Item(collection = fossil_collection, name="A fossil", description="A fossil for the collection")
session.add(fossil)

session.commit()
###################### End Test Data Insertion #############################

app.install(JwtPlugin(validation, 'secret', algorithm='HS256'))
app.run(host="0.0.0.0", port="9988")
