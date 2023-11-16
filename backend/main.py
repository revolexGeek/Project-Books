from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from routers import v1
from database.db import Base, engine


def init_db():
    # Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


init_db()

app = FastAPI()

# Регулируем CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1.router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"success": True,
            "message": "Books API is up and running!",
            "version": "1.0",
            "api_route": "/api/v1"}
