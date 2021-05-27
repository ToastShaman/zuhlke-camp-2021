package endpoints

import (
	"net/http"
)

func End(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	w.WriteHeader(200)
}
