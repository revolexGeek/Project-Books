from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime

from database.db import Base


class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    price = Column(Float)
    in_stock = Column(Integer)
    rating = Column(Integer, index=True)
    upc = Column(String, index=True)
    category = Column(String)
    image = Column(String)
    url = Column(String, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return "<Book {}>".format(self.title)


class Crawler(Base):
    __tablename__ = "crawler"

    id = Column(Integer, primary_key=True, index=True)
    state = Column(String, default="waiting")

    def __repr__(self):
        return "<Crawler ({})>".format(self.state)