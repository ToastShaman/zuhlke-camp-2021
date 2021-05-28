package endpoints

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func Move(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}
	var world World

	err := json.NewDecoder(r.Body).Decode(&world)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Printf("%+v\n", world)

	var moveResponse = MoveResponse{"up"}

	response, err := json.MarshalIndent(moveResponse, "", "  ")

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(200)
	_, _ = fmt.Fprintf(w, string(response))
}

type World struct {
	ID     int    `json:"id"`
	Turn   int    `json:"turn"`
	Height int    `json:"height"`
	Width  int    `json:"width"`
	Food   Food   `json:"food"`
	Snakes Snakes `json:"snakes"`
	Snake  Snake  `json:"you"`
}

type MoveResponse struct {
	Move string `json:"move"`
}

type Point struct {
	X int `json:"x"`
	Y int `json:"y"`
}

type Food struct {
	Data []Point `json:"data"`
}

type Body struct {
	Data []Point `json:"data"`
}

type Snake struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Body   Body   `json:"body"`
	Health int    `json:"health"`
	Length int    `json:"length"`
	Taunt  string `json:"taunt"`
}

type Snakes struct {
	Data []Snake `json:"data"`
}
