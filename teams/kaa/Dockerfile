FROM node:14-alpine
COPY . /src
WORKDIR /src

RUN npm install
RUN npm run build

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 9090
ENTRYPOINT ["node", "."]
