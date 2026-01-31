FROM node:22.22-alpine3.23 AS build
RUN apk add --no-cache python3 py3-pip make g++ curl unzip rclone
WORKDIR /usr/src/app
RUN npm install -g wrangler
COPY . .
RUN npm install
