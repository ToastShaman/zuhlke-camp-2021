package main

import (
	"./endpoints"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/start", endpoints.Start)
	http.HandleFunc("/move", endpoints.Move)
	http.HandleFunc("/end", endpoints.End)

	if err := http.ListenAndServe(":5000", nil); err != nil {
		log.Fatal(err)
	}

	println("Starting server at port 5000")
}
