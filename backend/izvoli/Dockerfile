FROM python:3.14-slim-trixie

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
    python3-pip \
    gettext \
    libpq-dev

RUN /usr/local/bin/python -m pip install --upgrade pip

RUN mkdir /app
WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app

EXPOSE 8000

ENV DJANGO_SETTINGS_MODULE=izvoli.settings

# this is the command for dev
CMD exec python manage.py runserver 0.0.0.0:8000
