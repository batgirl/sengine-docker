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

# FROM node:4.2.2 

# # Create app directory
# RUN mkdir -p /usr/src/all-lang-server
# WORKDIR /usr/src/all-lang-server

# # Install app dependencies
# COPY package.json /usr/src/all-lang-server/
# RUN npm install

# # Bundle app source
# COPY . /usr/src/all-lang-server

# EXPOSE 8080

# CMD [ "npm", "start" ]

# FROM perl

# RUN mkdir /data

# WORKDIR /data


# FROM node:4.2.2

# # Create app directory
# RUN mkdir -p /usr/src/static-host
# WORKDIR /usr/src/static-host

# # Install app dependencies
# COPY package.json /usr/src/static-host/
# RUN npm install

# # Bundle app source
# COPY . /usr/src/static-host

# EXPOSE 8080

# CMD [ "npm", "start" ]

