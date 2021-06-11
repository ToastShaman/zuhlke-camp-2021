import {Move, Point, World} from "./api";

function moveUp(world: World): Point {
    return new Point(world.you.body.data[0].x, world.you.body.data[0].y - 1)
}

function moveDown(world: World): Point {
    return new Point(world.you.body.data[0].x, world.you.body.data[0].y + 1)
}

function moveLeft(world: World): Point {
    return new Point(world.you.body.data[0].x - 1, world.you.body.data[0].y)
}

function moveRight(world: World): Point {
    return new Point(world.you.body.data[0].x + 1, world.you.body.data[0].y)
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

    private validate(nextMove: Point): number {
        if (nextMove.x < 0 || nextMove.x > this.world.width - 1) {
            return -100
        }

        if (nextMove.y == 0 || nextMove.y > this.world.height - 1) {
            return -100
        }

        return 1;
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

    private validate(nextMove: Point): number {
        if (this.world.you.body.data.some(point => point.x === nextMove.x && point.y === nextMove.y)) {
            return -100
        } else {
            return 1
        }
    }
}