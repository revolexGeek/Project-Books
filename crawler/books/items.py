# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy import Field


class Book(scrapy.Item):
    title = Field()
    price = Field()
    in_stock = Field()
    rating = Field()
    upc = Field()
    category = Field()
    image = Field()
    url = Field()
    updated_at = Field()