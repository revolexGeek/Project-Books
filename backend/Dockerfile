FROM python:3.9-slim

WORKDIR /backend

ENV PYTHONUNBUFFERED True

COPY ./requirements.txt backend/requirements.txt

COPY . /backend

RUN apt-get update && apt-get install -y libpq-dev build-essential

RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]