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

	println(world.ID)

	var moveResponse = MoveResponse{"up"}

	response, err := json.MarshalIndent(moveResponse, "", "  ")

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(200)
	_, _ = fmt.Fprintf(w, string(response))
}

type World struct {
	Food   Food   `json:"food"`
	Height int    `json:"height"`
	ID     int    `json:"id"`
	Snakes Snakes `json:Snakes`
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
	Body   Body   `json:"body"`
	Health int    `json:"health"`
	ID     string `json:"id"`
	Length int    `json:"length"`
	Name   string `json:"name"`
	Taunt  string `json:"taunt"`
}

type Snakes struct {
	Data  []Snake `json:"snakes"`
	Turn  int     `json:"turn"`
	Width int     `json:"width"`
	You   Snake   `json:"you"`
}
