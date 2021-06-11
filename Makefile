run-battlesnake-server:
	docker run --rm -it -p 3000:3000 sendwithus/battlesnake-server
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

tournament:
	docker compose -f docker-compose.tournament.yml up --build --remove-orphans --force-recreate
.PHONY: tournament
