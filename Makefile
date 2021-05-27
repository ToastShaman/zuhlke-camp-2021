run-battlesnake-server:
	docker pull sendwithus/battlesnake-server
	docker run --rm -it -p 3000:3000 sendwithus/battlesnake-server
.PHONY: run-battlesnake-server
