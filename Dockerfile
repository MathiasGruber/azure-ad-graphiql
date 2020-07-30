FROM mhart/alpine-node:latest

WORKDIR /app
ADD ./app /app/

RUN yarn install
CMD yarn start