package endpoints

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func Start(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	var startRequest StartRequest
	err := json.NewDecoder(r.Body).Decode(&startRequest)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	println(startRequest.GameID)

	var startResponse = StartResponse{
		"#FB6376",
		"#C9DDFF",
		"https://avatars.dicebear.com/api/identicon/go.svg",
		"I am go",
		"pixel",
		"pixel",
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(200)

	response, err := json.MarshalIndent(startResponse, "", "  ")

	_, _ = fmt.Fprintf(w, string(response))
}

type StartRequest struct {
	GameID int `json:"game_id"`
	Width  int `json:"width"`
	Height int `json:"height"`
}

type StartResponse struct {
	Color          string `json:"color"`
	SecondaryColor string `json:"secondary_color"`
	HeadURL        string `json:"head_url"`
	Taunt          string `json:"taunt"`
	HeadType       string `json:"head_type"`
	TailType       string `json:"tail_type"`
}
