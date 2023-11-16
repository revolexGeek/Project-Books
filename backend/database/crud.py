from typing import List, Optional, Union, Type

from sqlalchemy.orm import Session

from database import models
from sqlalchemy import text
from sqlalchemy import or_
from sqlalchemy import func
from config import scrapy_start_location
import subprocess

from database import schemas
from database.models import Book


def drop_db(db: Session):
    try:
        db.query(models.Book).delete()
        db.execute(text("ALTER SEQUENCE books_id_seq RESTART WITH 1"))  # Replace 'book_id_seq' with your actual sequence name
        db.commit()
        return {
            "success": True,
            "message": "Successfully dropped books table rows and id sequence!"
        }
    except Exception as e:
        return {
            "success": False,
            "message": "Failed to drop the books table rows and id sequence!",
            "error": str(e)
        }


def get_crawler_state(db: Session) -> Union[dict, None]:
    """
    Получение состояния парсера
    :param db: Объект сессии БД
    :return: состояние парсера
    """
    crawler = db.query(models.Crawler).first()
    if crawler is None:
        crawler = models.Crawler(state="waiting")
        db.add(crawler)
        db.commit()
        db.refresh(crawler)

    return {
        "state": crawler.state
    }


def start_crawler(db: Session) -> Union[dict, None]:
    """
    Запуск сбора книг с сайта
    :param db: Объект сессии БД
    :return: состояние парсера или ошибку
    """

    db_crawler = db.query(models.Crawler).first()

    if db_crawler is None:
        crawler = models.Crawler(state="waiting")
        db.add(crawler)
        db.commit()
        db.refresh(crawler)

    # Отлавливаем текущее состояние парсера
    if db_crawler.state == "running":
        # raise Exception("Crawler is already running!")
        return {
            "state": "Already running!"
        }

    # Добавить запуск Scrapy
    try:
        subprocess.Popen(["scrapy", "crawl", "book"], cwd=scrapy_start_location)
    except Exception as e:
        return {
            "state": "Error starting crawler",
            "error": str(e)
        }

    # Обновляем состояние парсера
    db_crawler.state = "running"
    db.commit()
    db.refresh(db_crawler)

    return {
        "state": db_crawler.state
    }


def reset_crawler(db: Session) -> str:
    """
    Установка статуста `waiting` для объекта `crawler`
    :param db: Объект сессии БД
    :return: состояние парсера
    """
    db_crawler = db.query(models.Crawler).first()

    if db_crawler is None:
        crawler = models.Crawler(state="waiting")
        db.add(crawler)
        db.commit()
        db.refresh(crawler)

    if db_crawler.state == "running":
        db_crawler.state = "waiting"
        db.commit()
        db.refresh(db_crawler)

    return db_crawler.state


def get_all_books(db: Session) -> List[Type[Book]]:
    """
    Получение всех книг
    :param db: Объект сессии БД
    :return: Список книг
    """
    return db.query(models.Book).all()


def get_books_limit(db: Session, limit: int = 10, offset: int = 0) -> List[Type[Book]]:
    """
    Получение определённого количества книг с оффсетом
    :param offset: Количество пропускаемых книг с начала
    :param db: Объект сессии БД
    :param limit: Количество получаемых книг
    :return: Список книг
    """
    return db.query(models.Book).order_by(models.Book.id.asc()).offset(offset).limit(limit).all()


def sort_by_rating(db: Session, from_rating: int, to_rating: int, order: str = "desc") -> Optional[List[schemas.Book]]:
    """
    Сортировка книг по рейтингу
    :param db: Объект сессии БД
    :param from_rating: Начальный рейтинг
    :param to_rating: Конечный рейтинг
    :param order: Тип сортировки: `desc` - по убыванию, `asc` - по возрастанию
    :return: Список книг
    """
    if order == "desc":
        return (db.query(models.Book)
                .filter(models.Book.rating >= from_rating,
                        models.Book.rating <= to_rating)
                .order_by(models.Book.rating.desc())
                .all())
    else:
        return (db.query(models.Book)
                .filter(models.Book.rating >= from_rating,
                        models.Book.rating <= to_rating)
                .order_by(models.Book.rating.asc())
                .all())


def sort_by_price(db: Session, from_price: float, to_price: float, order: str = "desc") -> Optional[List[schemas.Book]]:
    """
    Сортировка книг по цене
    :param db: Объект сессии БД
    :param from_price: Начальная цена
    :param to_price: Конечная цена
    :param order: Тип сортировки: `desc` - по убыванию, `asc` - по возрастанию
    :return: Список книг
    """
    if order == "desc":
        return (db.query(models.Book)
                .filter(models.Book.price >= from_price,
                        models.Book.price <= to_price)
                .order_by(models.Book.price.desc())
                .all())
    else:
        return (db.query(models.Book)
                .filter(models.Book.price >= from_price,
                        models.Book.price <= to_price)
                .order_by(models.Book.price.asc())
                .all())


def find_by_upc(db: Session, upc: str) -> Union[Type[Book], None]:
    """
    Поиск книг по UPC
    :param db: Объект сессии БД
    :param upc: UPC
    :return: Книга
    """
    return db.query(models.Book).filter(models.Book.upc == upc).first()


def find_by_name(db: Session, title: str) -> List[Type[Book]]:
    """
    Поиск книг по названию
    :param db: Объект сессии БД
    :param title: Название
    :return: Список книг
    """
    lower_title = title.lower()
    return db.query(models.Book).filter(func.lower(models.Book.title).like(f'%{lower_title}%')).all()
