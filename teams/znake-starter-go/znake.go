package main

import (
	"log"
	"net/http"
	"zuhlke.com/zsnake/endpoints"
)

func main() {
	http.HandleFunc("/start", endpoints.Start)
	http.HandleFunc("/move", endpoints.Move)
	http.HandleFunc("/end", endpoints.End)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}

	println("Starting server at port 8080")
}
