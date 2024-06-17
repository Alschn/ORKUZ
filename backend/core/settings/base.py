"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 5.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from datetime import timedelta
from pathlib import Path

from environ import Env

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = Env()
env.read_env()

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DEBUG", default=False)

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # third-party
    "corsheaders",
    "django_extensions",
    "ninja_extra",
    "ninja_jwt",
    "ninja_jwt.token_blacklist",
    # apps
    "accounts",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

ASGI_APPLICATION = "core.asgi.application"

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

IS_GITHUB_WORKFLOW = env("GITHUB_WORKFLOW", default=None)

USE_LOCAL_SQLITE_DB = env.bool("USE_LOCAL_SQLITE_DB", default=False)

DATABASE_URL = env("DATABASE_URL", default=None)

if IS_GITHUB_WORKFLOW:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": "github_actions",
            "USER": "postgres",
            "PASSWORD": "postgres",
            "HOST": "127.0.0.1",
            "PORT": "5432",
        }
    }

elif USE_LOCAL_SQLITE_DB:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
            "TEST": {
                "NAME": BASE_DIR / "test_db.sqlite3",
            },
        }
    }

elif DATABASE_URL:
    import dj_database_url  # noqa

    db_from_env = dj_database_url.config(
        default=DATABASE_URL,
        conn_max_age=500,
        conn_health_checks=True,
        ssl_require=True,
    )
    DATABASES = {"default": db_from_env}

else:
    DATABASES = {
        "default": {
            "ENGINE": env("DB_ENGINE", default="django.db.backends.postgresql"),
            "NAME": env("DB_NAME"),
            "USER": env("DB_USER"),
            "PASSWORD": env("DB_PASSWORD"),
            "HOST": env("DB_HOST"),
            "PORT": env.int("DB_PORT"),
        }
    }

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Europe/Warsaw"

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/


STATIC_URL = "/static/"
STATIC_ROOT = env("STATIC_ROOT", default=BASE_DIR / "static")

MEDIA_URL = "/uploads/"
MEDIA_ROOT = env("MEDIA_ROOT", default=BASE_DIR / "uploads")

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Custom user
# https://docs.djangoproject.com/en/5.0/topics/auth/customizing/

AUTH_USER_MODEL = "accounts.User"

# django-cors-headers settings
# https://pypi.org/project/django-cors-headers/

CORS_ALLOW_ALL_ORIGINS = env.bool("CORS_ALLOW_ALL_ORIGINS", default=False)

CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=[])

CORS_ORIGIN_WHITELIST = env.list("CORS_ORIGIN_WHITELIST", default=[])

CORS_ORIGIN_REGEX_WHITELIST = env.list("CORS_ORIGIN_REGEX_WHITELIST", default=[])

# ninja-jwt settings
# https://eadwincode.github.io/django-ninja-jwt/settings/

ACCESS_TOKEN_LIFETIME_SECONDS = env.int('JWT_ACCESS_LIFETIME_SECONDS', default=60 * 60)
REFRESH_TOKEN_LIFETIME_SECONDS = env.int('JWT_REFRESH_LIFETIME_SECONDS', default=24 * 60 * 60)

NINJA_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(seconds=ACCESS_TOKEN_LIFETIME_SECONDS),
    'REFRESH_TOKEN_LIFETIME': timedelta(seconds=REFRESH_TOKEN_LIFETIME_SECONDS),

    'TOKEN_OBTAIN_PAIR_INPUT_SCHEMA': 'accounts.schema.auth.TokenObtainPairInputSchema',
}