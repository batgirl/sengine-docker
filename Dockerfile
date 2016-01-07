# FROM node:4.2.2

# RUN mkdir /data

# WORKDIR /data

# FROM ruby

# RUN mkdir /data

# WORKDIR /data

# FROM python

# RUN mkdir /data

# WORKDIR /data

# FROM php

# RUN mkdir /data

# WORKDIR /data

FROM node:4.2.2

# Create app directory
RUN mkdir -p /usr/src/all-lang-server
WORKDIR /usr/src/all-lang-server

# Install app dependencies
COPY package.json /usr/src/all-lang-server/
RUN npm install

# Bundle app source
COPY . /usr/src/all-lang-server

EXPOSE 3000

CMD [ "npm", "start" ]