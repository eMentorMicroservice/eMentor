FROM node:alpine AS builder
WORKDIR /ementor
ENV PATH /ementor/node_modules/.bin:$PATH
COPY package.json /ementor/package.json
RUN npm install
RUN npm install -g @angular/cli@8.0.6
COPY . /ementor
CMD ng serve --host 0.0.0.0