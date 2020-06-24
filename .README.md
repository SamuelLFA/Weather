# Weather
This application inform the current climate of a city. For this, information obtained from the public API OpenWeatherMap is used.
Information on the most searched cities and the most recent ones are also available.

## Access the preview in the link:
https://samuellfa.com/weather_samuellfa.github.io/

## How to run
Go to *server/.env* and insert your OpenWeatherMap key.

**Obs:** Only KEY_OPEN_WEATHER is mandatory.

Make sure you have Docker installed on your machine. Otherwise, this is the link to install: https://docs.docker.com/get-docker/

In the root path of the application run on terminal:
> docker-compose build

Wait to finish the build and then:
> docker-compose up -d

If everything is ok, the application can be acessed by the link: http://localhost:8081/