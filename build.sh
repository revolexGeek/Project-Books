#!/bin/bash

# Обновление системных пакетов
sudo apt-get update -y && apt-get upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Запуск Docker сервиса 
sudo systemctl enable docker
sudo systemctl start docker

# Установка Docker Compose
sudo apt-get install -y docker-compose

# Запуск Docker Compose
docker-compose up -d

echo "Чтобы остановить работу контейнеров, выполните команду:"
echo "(sudo) docker-compose stop"