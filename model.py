
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