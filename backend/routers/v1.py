from asyncio import sleep
from typing import List, Union, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse

from database.crud import find_by_upc, find_by_name, sort_by_price, sort_by_rating, get_crawler_state, start_crawler, \
    get_all_books, reset_crawler, get_books_limit, drop_db

import database.schemas
from database.db import SessionLocal


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = APIRouter()


@router.get("/")
async def root():
    return RedirectResponse(url="/docs")


@router.post("/drop")
async def drop_table(db: Session = Depends(get_db)):
    return drop_db(db)


@router.get("/table", response_model=List[database.schemas.Book])
async def table(db: Session = Depends(get_db), limit: int = 10, offset: int = 0):
    return get_books_limit(db, limit, offset)


@router.get("/crawler/state")
async def crawler_state(db: Session = Depends(get_db)):
    return get_crawler_state(db)


@router.post("/crawler/start")
async def crawler_start(db: Session = Depends(get_db)):
    return start_crawler(db)


@router.post("/crawler/reset")
async def crawler_reset(db: Session = Depends(get_db)):
    return reset_crawler(db)


@router.post("/sort/price", response_model=List[database.schemas.Book])
async def sort_price(price_sort: database.schemas.SortByPrice, db: Session = Depends(get_db)):
    return sort_by_price(db, price_sort.from_price, price_sort.to_price, price_sort.order)


@router.post("/sort/rating", response_model=List[database.schemas.Book])
async def sort_rating(rating_sort: database.schemas.SortByRating, db: Session = Depends(get_db)):
    return sort_by_rating(db, rating_sort.from_rating, rating_sort.to_rating, rating_sort.order)


@router.post("/find/name", response_model=List[database.schemas.Book])
async def find_name(title: str, db: Session = Depends(get_db)):
    return find_by_name(db, title)


@router.post("/find/upc", response_model=Optional[database.schemas.Book])
async def find_upc(upc: str, db: Session = Depends(get_db)):
    await sleep(1)  # для отрисовки красивого скелетончика :)
    return find_by_upc(db, upc)
