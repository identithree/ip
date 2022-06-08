FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app

RUN mkdir -p .yarn/ public/ src/

COPY .yarn/ ./.yarn/
COPY public/ ./public/
COPY src/ ./src/
COPY .yarnrc.yml .
COPY Dockerfile .
COPY LICENSE .
COPY README.md .
COPY package.json .
COPY THIRD_PARTY_LIBRARIES.md .
COPY tsconfig.json .

RUN yarn set version berry
RUN yarn install
RUN yarn run build

ENTRYPOINT [ "yarn", "run", "start" ]