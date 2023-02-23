"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
import os
import django_heroku

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-+kx0b@h6!b((ektn^tgd@c(gb=4r4l1$m*j!5q*shj+!pztrn8'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = [
    '*',
    'djangobackend.azurewebsites.net',
    'policplant.herokuapp.com',
    'localhost',
    '127.0.0.1',
    '.ngrok.io'
    ]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'base.apps.BaseConfig',
    'rest_framework',
    'corsheaders',
    'rest_framework_swagger',
    'storages',
]

REST_FRAMEWORK = {
    
    'DEFAULT_AUTHENTICATION_CLASSES': (
        
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
    
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
   
]



ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'frontend/build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

# DATABASES = {
#       'default': {
#          'engine': 'django.db.backends.sqlite3',
#          'name': BASE_DIR / 'db.sqlite3',
#      }
# } 


#ovo je DB u localu
# DATABASES = {
#      'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#          'NAME': 'PolicPlant',
#          'USER': 'postgres',
#          'PASSWORD':'ok',
#          'HOST':'localhost',
#          'PORT':'5432'

#      }
# }

#ovo je DB na Azuru(policplant-azure)
DATABASES = {
     'default': {
        'ENGINE': 'django.db.backends.postgresql',
         'NAME': 'PolicPlant',
         'USER': 'postgres@policplant-azure',
         'PASSWORD':'Prnjavorska114',
         'HOST':'policplant-azure.postgres.database.azure.com',
         'PORT':'5432',
         'sslmode':True

     }
}

#ovo je DB na HEROKU
#DATABASES = {
#       'default': {
#           'ENGINE': 'django.db.backends.postgresql',
#           'NAME': 'policplant',
#           'USER': 'postgres',
#           'PASSWORD':'Prnjavorska114',
#           'HOST':'policplant.ciwljxueoqxr.eu-west-2.rds.amazonaws.com',
#           'PORT':'5432'
#
#       }
#}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

# AUTH_PASSWORD_VALIDATORS = [
#     {
#         'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
#     },
# ]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_ROOT=os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = 'static/'
MEDIA_ROOT=os.path.join(BASE_DIR, 'static/images')
MEDIA_URL = 'images/'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
    BASE_DIR / 'frontend/build/static'
]

MEDIA_ROOT = BASE_DIR / 'static/images' # ovo je bill: MEDIA_ROOT= 'static/images'

# email Gmail subsystem
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST_USER = 'stanko.polic32@gmail.com'
# EMAIL_HOST='stmp.gmail.com'
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# EMAIL_HOST_PASSWORD=''

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = 'stanko.polic32@gmail.com'
EMAIL_HOST_PASSWORD = 'lyvkcfoivvxhitjr'
DEFAULT_FROM_EMAIL = 'default from email'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_ALL_ORIGINS: True
CORS_ALLOW_HEADERS = ['*']
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = (
        'http://localhost:3000',
    )

AWS_ACCESS_KEY_ID='AKIA4GLCWMLIDBYACJS3'
AWS_SECRET_ACCESS_KEY='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'
AWS_STORAGE_BUCKET_NAME='policplant'
AWS_S3_FILE_OVERWRITE=False
AWS_DEFAULT_ACL=None
DEFAULT_FILE_STORAGE='storages.backends.s3boto3.S3Boto3Storage'

django_heroku.settings(locals())
AUTH_USER_MODEL = 'base.UserAccount'

if os.getcwd() == '/app':
    DEBUG = False

