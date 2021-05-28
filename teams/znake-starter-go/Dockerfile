FROM golang:1.16.4-alpine3.13 as build
COPY . /src
WORKDIR /src
RUN go build -o /out/snake

FROM golang:1.16.4-alpine3.13
COPY --from=build /out/snake /app/snake

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 9090
ENTRYPOINT ["/app/snake"]
