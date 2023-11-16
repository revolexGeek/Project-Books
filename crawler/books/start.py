from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from books.spiders.book import BookSpider


def main():
    process = CrawlerProcess(get_project_settings())
    process.crawl(BookSpider)
    process.start()


if __name__ == "__main__":
    main()
