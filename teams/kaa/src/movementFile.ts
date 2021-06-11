import {Move, Point, World} from "./api";

let terminal = -100000;

function head(world: World) {
    return world.you.body.data[0];
}

function moveUp(world: World): Point {
    return new Point(head(world).x, head(world).y - 1)
}

function moveDown(world: World): Point {
    return new Point(head(world).x, head(world).y + 1)
}

function moveLeft(world: World): Point {
    return new Point(head(world).x - 1, head(world).y)
}

function moveRight(world: World): Point {
    return new Point(head(world).x + 1, head(world).y)
}

function nextMove(world: World, move: Move): Point {
    switch (move) {
        case Move.up: return moveUp(world)
        case Move.down: return moveDown(world)
        case Move.left: return moveLeft(world)
        case Move.right: return moveRight(world)
    }
}

export type Movement = {
    move: Move,
    score: number
}

export class OutOfBoundsValidator {
    readonly world: World

    constructor(world: World) {
        this.world = world
    }

    public movements(): Movement[] {
        return [
            {move: Move.up, score: this.validate(moveUp(this.world))},
            {move: Move.down, score: this.validate(moveDown(this.world))},
            {move: Move.left, score: this.validate(moveLeft(this.world))},
            {move: Move.right, score: this.validate(moveRight(this.world))}
        ]
    }

    private validate(head: Point): number {
        if (head.x < 0 || head.x > this.world.width - 1) {
            return terminal
        }

        if (head.y == 0 || head.y > this.world.height - 1) {
            return terminal
        }

        return 0;
    }
}

export class DoNotEatYourself {
    readonly world: World

    constructor(world: World) {
        this.world = world
    }

    public movements(): Movement[] {
        return [
            {move: Move.up, score: this.validate(moveUp(this.world))},
            {move: Move.down, score: this.validate(moveDown(this.world))},
            {move: Move.left, score: this.validate(moveLeft(this.world))},
            {move: Move.right, score: this.validate(moveRight(this.world))}
        ]
    }

    private validate(head: Point): number {
        if (this.world.you.body.data.some(point => point.x === head.x && point.y === head.y)) {
            return terminal
        } else {
            return 0
        }
    }
}


function distance(food: Point, currentHead: Point) {
    return Math.sqrt(Math.pow(food.x - currentHead.x, 2) + Math.pow(food.y - currentHead.y, 2));
}

export class FindFood {
    readonly world: World

    constructor(world: World) {
        this.world = world
    }
    public movements(): Movement[] {
        return [
            {move: Move.up, score: this.hunt(Move.up)},
            {move: Move.down, score: this.hunt(Move.down)},
            {move: Move.left, score: this.hunt(Move.left)},
            {move: Move.right, score: this.hunt(Move.right)}
        ]
    }

    private hunt(move: Move): number {
        let foods = this.world.food.data
        let currentHead = head(this.world);
        let foodsWithDistance = foods.map(food => (
            {
                food: food,
                distance: distance(food, currentHead)
            }
        )).sort((a, b) => a.distance - b.distance);
        let closestFood = foodsWithDistance[0];
        let nextHead = nextMove(this.world, move);
        let x = distance(nextHead, closestFood.food);
        return -1 * x;
    }
}