
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

Base = declarative_base()
engine = create_engine('sqlite:///:memory:', echo=True)
Session = sessionmaker(bind=engine)

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
    """
    The model class representing a single item belonging to a single collection.
    """

    __tablename__ = 'item'

    id = Column(Integer, primary_key=True)
    collection_id = Column(Integer, ForeignKey("collection.id"))
    name = Column(String)
    description = Column(String)

    collection = relationship("Collection", back_populates="items")

def get_item_by_name(session, user, collection, name):
    """
    Searches for an item by name and returns it or None.
    :param name: The name of the item to search for
    :return: The matching item if found, or None otherwise.
    """

    user = get_user_by_name(session, user)
    collection = get_collection_by_name(session, collection)

    if not user:
        return None

    if not collection:
        return None

    return session.query(Item).filter(Item.name == name, Item.collection==collection, Collection.user == user).first()

def get_user_by_name(session, name):
    """
    Searches for a user by display name and returns it or None.
    :param name: The display name of the user to search for
    :return: The matching user if found, or None otherwise.
    """
    return session.query(User).filter(User.display_name == name).first()

def get_collection_by_name(session, name):
    """
    Searches for a collection by name and returns it or None.
    :param name: The name of the collection to search for
    :return: The matching collection if found, or None otherwise.
    """
    return session.query(Collection).filter(Collection.name == name).first()

def get_collection_items(session, name):
    return get_collection_by_name(session, name).items

def is_user_logged_in(session, auth, user):
    """
    Returns whether or not the specified user is the currently logged in user.
    :param auth: The JWT token sent by the client.
    :param user: The display name of the user we want to verify is logged in.
    :return: Whether or not the specified user is logged in according to the JWT token.
    """
    user_record = get_user_by_name(session, user)

    if not user_record:
        return False

    return user_record.id == auth["id"]