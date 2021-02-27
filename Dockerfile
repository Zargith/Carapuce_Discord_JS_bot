FROM ubuntu:20.04

USER root

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt upgrade -y && apt-get install -y apt-utils build-essential curl ffmpeg libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
RUN curl -fsSL https://deb.nodesource.com/setup_15.x | bash -
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get update && apt upgrade -y && apt-get install -y nodejs
#RUN apt-get install -y npm
RUN apt-get update && apt upgrade -y
RUN npm i npm@latest node-gyp @mapbox/node-pre-gyp -g

WORKDIR /usr/src/app/bot
COPY . .
RUN npm ci

CMD [ "npm", "start" ]