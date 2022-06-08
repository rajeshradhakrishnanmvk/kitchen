#!/bin/sh

if [ -z "$PORT"]
then
  PORT=5005
fi

#rasa run --enable-api --port $PORT
rasa run -p $PORT -m models --credentials credentials.yml --enable-api --log-file out.log --endpoints endpoints.heroku.yml