# Stage 1
FROM node:16-buster AS build

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
COPY --from=build /app/src/config.e2e.js dist/littil-org-website/config.js

# Stage 2
FROM nginx:1

COPY --from=build /app/src/config.e2e.js /app/dist/littil-org-website/config.js
COPY --from=build /app/dist/littil-org-website /usr/share/nginx/html

COPY src/docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template

ENV PORT 80
