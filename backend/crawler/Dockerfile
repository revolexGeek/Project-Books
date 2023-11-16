FROM python:3.9-slim

WORKDIR /crawler

ENV PYTHONUNBUFFERED True

COPY ./requirements.txt crawler/requirements.txt

COPY . /crawler

RUN apt-get update && apt-get install -y libpq-dev build-essential

RUN pip3 install -r requirements.txt
