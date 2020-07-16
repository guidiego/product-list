FROM mhart/alpine-node

ADD . /app
WORKDIR /app

RUN yarn install
RUN ./node_modules/.bin/cross-env NODE_ENV=production yarn build

CMD ["yarn", "start"]
