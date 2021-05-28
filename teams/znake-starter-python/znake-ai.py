import jsonpickle
from flask import Flask, request, jsonify

from model import MoveResponse, StartResponse, StartRequest, World

app = Flask(__name__)


@app.route('/start', methods=['POST'])
def start():
    print(StartRequest(**request.get_json()))
    return jsonpickle.encode(StartResponse(
        "#F2C14E",
        "#5FAD56",
        "https://avatars.dicebear.com/api/identicon/python.svg",
        "Ahoy matey!",
        "pixel",
        "pixel"
    )), 200, {"Content-Type": "application/json"}


@app.route('/move', methods=['POST'])
def move():
    print(World(**request.get_json()))

    # TODO: decide where you would like to move next
    return jsonify(MoveResponse("up")), 200, {"Content-Type": "application/json"}


@app.route('/end', methods=['POST'])
def end():
    return jsonify({}), 200, {"Content-Type": "application/json"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9090)
