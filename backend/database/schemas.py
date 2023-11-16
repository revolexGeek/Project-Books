import datetime
from typing import Optional, Union

from pydantic import BaseModel, Field


class Book(BaseModel):
    id: int = Field(gt=0)
    title: Optional[str] = Field(min_length=1, max_length=1000)
    price: Optional[float] = Field(gt=0)
    in_stock: Union[int, None] = None
    rating: int = Field(gt=0, le=5)
    upc: str
    category: str
    image: Union[str, None] = None
    url: str
    updated_at: Union[str, datetime.datetime]

    class Config:
        orm_mode = True


class Crawler(BaseModel):
    state: str


# class FindByPrice(BaseModel):
#     from_price: float
#     to_price: float
#     order: str = "desc"
#
#
# class FindByName(BaseModel):
#     title: str
#
#
# class FindByUpc(BaseModel):
#     upc: str
#
#
class SortByPrice(BaseModel):
    from_price: float = Field(ge=0)
    to_price: float = Field(ge=0)
    order: str = "desc"


class SortByRating(BaseModel):
    from_rating: int = Field(ge=1)
    to_rating: int = Field(ge=1)
    order: str = "desc"
