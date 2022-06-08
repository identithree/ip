FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY . .

RUN ls /app
RUN yarn install
RUN yarn run build

ENTRYPOINT [ "yarn", "run", "start" ]