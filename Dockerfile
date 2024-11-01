ARG NODE_VERSION
FROM node:${NODE_VERSION}-alpine

ADD . /app

CMD ["node", "/app/esm.js"]