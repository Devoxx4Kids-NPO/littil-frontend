# Docker file for e2e test
# Run the following comamnd to build the docker image
#
#   docker build -f src\docker\Dockerfile -t littil-frontend . 
#

# Stage 1
FROM node:16-buster AS build

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Stage 2
FROM nginx:1

COPY --from=build /app/dist/littil-org-website /usr/share/nginx/html
COPY --from=build /app/src/config.e2e.js /usr/share/nginx/html/config.js

COPY src/docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template

ENV PORT 80
