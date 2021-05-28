from typing import List
from uuid import UUID


class StartRequest(object):
    game_id: int
    width: int
    height: int

    def __init__(self, game_id: int, width: int, height: int) -> None:
        self.game_id = game_id
        self.width = width
        self.height = height


class StartResponse(object):
    color: str
    secondary_color: str
    head_url: str
    taunt: str
    head_type: str
    tail_type: str

    def __init__(self,
                 color: str,
                 secondary_color: str,
                 head_url: str,
                 taunt: str,
                 head_type: str,
                 tail_type: str) -> None:
        self.color = color
        self.secondary_color = secondary_color
        self.head_url = head_url
        self.taunt = taunt
        self.head_type = head_type
        self.tail_type = tail_type


class Point(object):
    x: int
    y: int

    def __init__(self, x: int, y: int) -> None:
        self.x = x
        self.y = y


class Food:
    data: List[Point]
    object: str

    def __init__(self, data: List[Point]) -> None:
        self.data = data


class Snake(object):
    body: Food
    health: int
    id: UUID
    length: int
    name: str
    object: str
    taunt: str

    def __init__(self,
                 body: Food,
                 health: int,
                 id: UUID,
                 length: int,
                 name: str,
                 taunt: str) -> None:
        self.body = body
        self.health = health
        self.id = id
        self.length = length
        self.name = name
        self.taunt = taunt


class Snakes(object):
    data: List[Snake]

    def __init__(self, data: List[Snake]) -> None:
        self.data = data


class World(object):
    food: Food
    height: int
    id: int
    snakes: Snakes
    turn: int
    width: int
    you: Snake

    def __init__(self,
                 food: Food,
                 height: int,
                 id: int,
                 snakes: Snakes,
                 turn: int,
                 width: int,
                 you: Snake) -> None:
        self.food = food
        self.height = height
        self.id = id
        self.object = object
        self.snakes = snakes
        self.turn = turn
        self.width = width
        self.you = you


class MoveResponse(object):
    move: str

    def __init__(self, move: str) -> None:
        self.move = move
