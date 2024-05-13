# ORKUZ backend

REST API written for the purpose of the final paper.

## Prerequisites

- Docker Engine
- Python 3.11+
- `poetry`

## Setup

Make sure you are in the `backend` working directory:

Create a `.venv` dir and spawn a shell to create a new virtual environment:

```shell
mkdir .venv
```

```shell
poetry shell
```

Install dependencies:

```shell
poetry install
```

Define environmental variables in `.env` file:

```dotenv
POSTGRES_DB=orkuz-postgres-db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

SECRET_KEY=yOuR-S3CrETk-ey
DJANGO_SETTINGS_MODULE=core.settings.base
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,backend,host.docker.internal
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
CSRF_TRUSTED_ORIGINS=http://localhost,http://127.0.0.1

DB_NAME=$POSTGRES_DB
DB_USER=$POSTGRES_USER
DB_PASSWORD=$POSTGRES_PASSWORD
DB_HOST=postgres-db
DB_PORT=5432
```

Make sure Docker Engine is running.

Run the application:

```shell
docker compose up
```

Bring down the application:

```shell
docker compose down
```

### Run migrations

```shell
docker compose exec backend python manage.py migrate
```

### Create superuser

```shell
docker compose exec backend python manage.py createsuperuser
```

### Other commands

#### Making migrations

```shell
docker compose exec backend python manage.py makemigrations
```

#### Running unit tests

```shell
docker compose exec backend coverage run manage.py test
```

#### Generating coverage report

```shell
docker compose exec backend coverage report -m
```

#### Running linter

```shell
docker compose exec backend ruff check
```

#### Running formatter

```shell
docker compose exec backend ruff format
```
