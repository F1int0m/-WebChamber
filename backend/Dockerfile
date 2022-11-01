FROM python:3.10
ARG Test
RUN mkdir -m 777 -p /app
WORKDIR /app

COPY requirements.txt requirements.txt
COPY requirements-dev.txt requirements-dev.txt

RUN if [ "$Test" == "true" ]; then \
        pip3 install --no-cache-dir \
        --requirement /app/requirements-dev.txt; \
    else \
        pip3 install --no-cache-dir \
        --requirement /app/requirements.txt; \
    fi;

COPY . .

RUN find . -name __pycache__ -type d | xargs rm -rf &&\
    rm -f config/local.py

RUN if [ "$Test" == "true" ]; then \
        cp config/docker.py config/local.py; \
    fi;

