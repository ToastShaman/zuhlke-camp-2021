run-znake:
	./gradlew clean bootRun
.PHONY: run-znake

run-battlesnake-server:
	docker pull sendwithus/battlesnake-server
	docker run --rm -it -p 3000:3000 sendwithus/battlesnake-server
.PHONY: run-battlesnake-server

ngrok-for-tournament:
	ngrok http 8080
.PHONY: ngrok-for-tournament
