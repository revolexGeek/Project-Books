import re
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem
from sqlalchemy.orm import sessionmaker
from books.models import Book, db_connect
from books.crud import is_book_exists


class BooksRefactorPipeline:
    def __init__(self):
        self.ratings = {
            "one": 1,
            "two": 2,
            "three": 3,
            "four": 4,
            "five": 5
        }

        self.in_stock_regex = r"\((\d+)\savailable\)"

    def process_item(self, item, spider):
        """ Форматирование данных """
        adapter = ItemAdapter(item)

        price = adapter["price"]
        price = float(price.replace("£", ""))
        rating = self.ratings[adapter["rating"].split()[-1].lower()]

        in_stock = adapter["in_stock"]
        match = re.search(self.in_stock_regex, in_stock)
        if match:
            in_stock = match.group(1)
        else:
            raise DropItem(f"Missing in_stock in {item}")

        adapter["price"] = price
        adapter["in_stock"] = in_stock
        adapter["rating"] = rating

        return item


class BooksPipeline:
    def __init__(self):
        """ Инициализирование подключения к базе данных """
        engine = db_connect()
        self.Session = sessionmaker(bind=engine)

    def process_item(self, item, spider):
        """ Сохранение книг в БД """
        session = self.Session()

        found_book = is_book_exists(session, item["url"])
        if found_book:
            found_book.title = item["title"]
            found_book.price = item["price"]
            found_book.in_stock = item["in_stock"]
            found_book.rating = item["rating"]
            found_book.upc = item["upc"]
            found_book.category = item["category"]
            found_book.image = item["image"]
            found_book.url = item["url"]
            found_book.updated_at = item["updated_at"]
            try:
                session.commit()
                session.refresh(found_book)
            except:
                session.rollback()
                raise
            finally:
                session.close()
        else:
            book = Book()
            book.title = item["title"]
            book.price = item["price"]
            book.in_stock = item["in_stock"]
            book.rating = item["rating"]
            book.upc = item["upc"]
            book.category = item["category"]
            book.image = item["image"]
            book.url = item["url"]
            book.updated_at = item["updated_at"]

            try:
                session.add(book)
                session.commit()
            except:
                session.rollback()
                raise
            finally:
                session.close()

        return item
