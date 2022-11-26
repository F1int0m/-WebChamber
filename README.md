# WebChamber

Для запуска нужно переименовать файлик `.env.example` в `.env` и прописать там нужные значения для всех контейнеров

В качестве авторизации используем куки

## Frontend

Docker image: docker build -t frontend:dev
Docker run: docker run -it --rm -v ${PWD}:/frontend -v /frontend/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true frontend:dev

## Backend

Живем с прекомитами

```bash
pre-commit install -f
pre-commit install -f --hook-type pre-push
```
