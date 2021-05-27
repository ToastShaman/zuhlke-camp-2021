export class StartRequest {
    readonly game_id: number;
    readonly width: number;
    readonly height: number;

    constructor(game_id: number, width: number, height: number) {
        this.height = height;
        this.width = width;
        this.game_id = game_id;
    }
}

export class StartResponse {
    readonly color: string
    readonly secondary_color: string
    readonly head_url: string
    readonly taunt: string
    readonly head_type: Head
    readonly tail_type: Tail

    constructor(color: string = "#FF0000",
                secondary_color: string = "#00FF00",
                head_url: string = "http://tinygraphs.com/spaceinvaders/tinygraphs?theme=sugarsweets&numcolors=2&size=220&fmt=png",
                taunt: string = "OH GOD NOT THE BEES",
                head_type: Head = Head.bendr,
                tail_type: Tail = Tail.blockbum) {
        this.tail_type = tail_type;
        this.head_type = head_type;
        this.taunt = taunt;
        this.head_url = head_url;
        this.secondary_color = secondary_color;
        this.color = color;
    }
}

export enum Tail {
    blockbum = "block-bum",
    curled = "curled",
    fatrattle = "fat-rattle",
    freckled = "freckled",
    pixel = "pixel",
    regular = "regular",
    roundbum = "round-bum",
    skinny = "skinny",
    smallrattle = "small-rattle",
}

export enum Head {
    bendr = "bendr",
    dead = "dead",
    fang = "fang",
    pixel = "pixel",
    regular = "regular",
    safe = "safe",
    sandworm = "sand-worm",
    shades = "shades",
    smile = "smile",
    tongue = "tongue"
}

export class MoveResponse {
    readonly move: Move;

    constructor(move: Move) {
        this.move = move;
    }
}

export enum Move {
    up, right, ldown, left
}

export class World {
    readonly id: number;
    readonly turn: number;
    readonly height: number;
    readonly width: number;
    readonly food: Food;
    readonly snakes: Snakes;
    readonly you: Snake;

    constructor(id: number,
                turn: number,
                height: number,
                width: number,
                food: Food,
                snakes: Snakes,
                you: Snake) {
        this.id = id;
        this.turn = turn;
        this.height = height;
        this.width = width;
        this.food = food;
        this.snakes = snakes;
        this.you = you;
    }
}

export class Food {
    readonly data: Point[];

    constructor(data: Point[]) {
        this.data = data;
    }
}

export class Point {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.y = y;
        this.x = x;
    }
}

export class Body {
    readonly data: Point[];

    constructor(data: Point[]) {
        this.data = data;
    }
}

export class Snakes {
    readonly data: Snake[];

    constructor(data: Snake[]) {
        this.data = data;
    }
}

export class Snake {
    readonly body: Body;
    readonly id: string;
    readonly name: string;
    readonly health: number;
    readonly length: number;
    readonly taunt?: string;

    constructor(body: Body,
                id: string,
                name: string,
                health: number,
                length: number,
                taunt?: string) {
        this.id = id;
        this.name = name;
        this.health = health;
        this.length = length;
        this.taunt = taunt;
        this.body = body;
    }
}
