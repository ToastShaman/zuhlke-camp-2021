FROM rust:latest as builder
WORKDIR /usr/src/zsnake
COPY . .
RUN cargo install --path .

FROM debian:buster-slim
COPY --from=builder /usr/local/cargo/bin/zsnake /opt/zsnake
CMD ["./opt/zsnake"]
