from typing import Union, Type
from sqlalchemy.orm import Session
from books.models import Book, Crawler


def is_book_exists(session: Session, bookUrl: str) -> Union[Type[Book], bool]:
    """
    Проверка на наличии книги в базе данных
    :param session: объект сессии бд
    :param bookUrl: ссылка на книгу
    :return: объект книги `Book`, если книга найдена, `False` если книга не найдена
    """
    book = session.query(Book).filter_by(url=bookUrl).first()
    if book is None:
        return False
    else:
        return book


def change_spider_state(session: Session, state: str) -> None:
    """
    Изменить состояние паука
    :param session: объект сессии бд
    :param state: новое состояние
    """
    crawler = session.query(Crawler).first()
    crawler.state = state
    session.commit()
    session.refresh(crawler)
