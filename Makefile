run-battlesnake-server:
	docker run --rm -it -p 5000:3000 sendwithus/battlesnake-server
.PHONY: run-battlesnake-server

clean:
	docker compose rm -sfv
.PHONY: clean

build:
	docker compose up --build --remove-orphans --no-start
.PHONY: build

up:
	docker compose up --force-recreate
.PHONY: up

down:
	docker compose stop
.PHONY: down
