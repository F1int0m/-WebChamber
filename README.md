# WebChamber

WebChamber – платформа для аниматоров, где они могут публиковать работы, участвовать в челенджах и наполнять свое портфолио.

## Запуск

Для запуска нужно переименовать файлик `.env.example` в `.env` и прописать там нужные значения для всех контейнеров

В качестве авторизации используем куки

### Backend

Живем с прекомитами

```bash
pre-commit install -f
pre-commit install -f --hook-type pre-push
```
