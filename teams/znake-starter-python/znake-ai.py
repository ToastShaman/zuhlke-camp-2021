import jsonpickle
from flask import Flask, request

from model import MoveResponse, StartResponse, StartRequest, World

app = Flask(__name__)


@app.route('/start', methods=['POST'])
def start():
    print(StartRequest(**request.get_json()))
    return jsonpickle.encode(StartResponse(
        "#123456",
        "#654321",
        "https://www.tinygraphs.com/spaceinvaders/tinygraphs?theme=sugarsweets&numcolors=2&size=220&fmt=png",
        "Ahoy matey!",
        "pixel",
        "pixel"
    ))


@app.route('/move', methods=['POST'])
def move():
    print(World(**request.get_json()))
    return jsonpickle.encode(MoveResponse("up"))


@app.route('/end', methods=['POST'])
def end():
    return ""


if __name__ == "__main__":
    app.run()
