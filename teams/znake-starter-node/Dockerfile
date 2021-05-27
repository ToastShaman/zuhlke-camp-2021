FROM node:12-alpine
COPY . /src
WORKDIR /src
RUN npm run build

EXPOSE 8080
ENTRYPOINT ["node", "."]
