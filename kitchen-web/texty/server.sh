#!/bin/sh

# if [ -z "$PORT"]
# then
#   PORT=5005
# fi

#rasa run --enable-api --port $PORT
#rasa run -p $PORT -m models --credentials credentials.yml --log-file out.log --cors "*" --enable-api --debug --endpoints endpoints.heroku.yml
rasa run -p $PORT -m models --credentials credentials.yml --log-file out.log --cors "*" --enable-api --endpoints endpoints.heroku.yml