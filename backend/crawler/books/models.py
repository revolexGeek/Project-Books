from datetime import datetime

from sqlalchemy import create_engine, Column, Integer, Float, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

from scrapy.utils.project import get_project_settings

Base = declarative_base()


def db_connect():
    return create_engine(get_project_settings().get("POSTGRES_DRIVER_URL"))


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
    updated_at = Column(DateTime, default=datetime.utcnow)
    url = Column(String, index=True)

    def __repr__(self):
        return "<Book {}>".format(self.title)


class Crawler(Base):
    __tablename__ = "crawler"
    id = Column(Integer, primary_key=True, index=True)
    state = Column(String, index=True)

    def __repr__(self):
        return "<Crawler ({})>".format(self.state)
