FROM golang:1.16.4-alpine3.13 as build
COPY . /src
WORKDIR /src
RUN go build -o /out/snake

FROM golang:1.16.4-alpine3.13
COPY --from=build /out/snake /app/snake
EXPOSE 8080
ENTRYPOINT ["/app/snake"]
