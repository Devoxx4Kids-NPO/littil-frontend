# Docker file for e2e test
# Run the following comamnd from to root of the project to build the docker image
#
#   docker build -f docker\Dockerfile -t littil-frontend . 
#

# Stage 1
#FROM timbru31/java-node AS build
FROM node:16-buster AS build

RUN apt-get update && \
    apt-get install -y openjdk-11-jre-headless && \
    apt-get clean;

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install
RUN npm install -g ng-openapi-gen

COPY . /app

RUN npm run openapi

RUN npm run build --prod

# Stage 2
FROM nginx:1

COPY --from=build /app/dist/littil-org-website /usr/share/nginx/html
COPY --from=build /app/src/config.e2e.js /usr/share/nginx/html/config.js

COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template

ENV PORT 80
