import datetime

import scrapy
from scrapy import signals
from scrapy.linkextractors import LinkExtractor
from sqlalchemy.orm import sessionmaker

from ..items import Book
from ..crud import change_spider_state
from ..models import db_connect

engine = db_connect()
Session = sessionmaker(bind=engine)


class BookSpider(scrapy.Spider):
    name = "book"

    def start_requests(self):
        """ Точка входа """
        yield scrapy.Request(
            url="https://books.toscrape.com/",
            callback=self.parse_page
        )

    def parse_book(self, response):
        """ Получение данных о книге, на странице книги """
        item = Book()

        item['title'] = response.css('div.col-sm-6.product_main > h1::text').get()
        item['image'] = "https://books.toscrape.com/" + response.css(".item.active img::attr(src)").get()
        item['price'] = response.css('p.price_color::text').get()
        item['rating'] = response.css('p.star-rating::attr(class)').get()
        item['url'] = response.request.url

        for row in response.css("table.table.table-striped").css("tr"):
            if row.css("th::text").get() == "UPC":
                item['upc'] = row.css("td::text").get()
            if row.css("th::text").get() == "Availability":
                item['in_stock'] = row.css("td::text").get()

        item['category'] = response.css("ul.breadcrumb").css("a")[-1].css("::text").get()
        item['updated_at'] = datetime.datetime.utcnow()

        yield item

    def parse_page(self, response):
        """ Сбор страницы с книгами """
        for book in response.css("article.product_pod"):
            url = book.css("div.image_container > a::attr(href)").get()
            if 'catalogue' not in url:
                url = "https://books.toscrape.com/catalogue/" + url
            else:
                url = "https://books.toscrape.com/" + url
            yield scrapy.Request(url=url, callback=self.parse_book)

        next_page = LinkExtractor(restrict_css='.next a').extract_links(response)[0]
        if next_page is not None:
            yield response.follow(next_page, callback=self.parse_page)

    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        spider = super(BookSpider, cls).from_crawler(crawler, *args, **kwargs)
        crawler.signals.connect(spider.spider_closed, signal=signals.spider_closed)
        return spider

    def spider_closed(self, spider):
        """ Закрытие паука, отправка запроса на API """
        session = Session()
        try:
            change_spider_state(session, "waiting")
        except:
            # ...
            pass
        finally:
            session.close()
