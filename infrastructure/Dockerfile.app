FROM node:20.16.0-alpine3.19 as dependencies
WORKDIR /app
RUN yarn add -D vite
RUN yarn
FROM dependencies as node_server
WORKDIR /app
CMD yarn && yarn dev