import { Move, Point, World } from "./api";
// import { OutOfBoundsValidator } from "./outOfBoundsValidator";

export class Up {
    readonly world: World
    constructor(headPosition: Point, world:World) {
     this.world = world;   
    }

    public NextMove(): Point{
        return new Point(this.world.you.body.data[0].x,this.world.you.body.data[0].y + 1)
    }

    // ValidateMove():number{
    //     var outOfBoundsValidator = new OutOfBoundsValidator(this,this.world )
    //     return outOfBoundsValidator.ValidateMove()
    // }
}

function moveUp(world: World) : Point {
    return new Point(world.you.body.data[0].x, world.you.body.data[0].y + 1)
}

function moveDown(world: World) : Point {
    return new Point(world.you.body.data[0].x, world.you.body.data[0].y -1)
}

function moveLeft(world: World) : Point {
    return new Point(world.you.body.data[0].x -1, world.you.body.data[0].y)
}

function moveRight(world: World) : Point {
    return new Point(world.you.body.data[0].x +1, world.you.body.data[0].y )
}

export type Movement ={
    move: Move,
    score: number
}

// type Movements = {
//     up: number;
//     down: number;
//     left: number;
//     right: number;
// }



export class OutOfBoundsValidator {

    readonly world: World
    constructor(world: World){
        this.world = world
    }
    public movements():Movement[] {
        return [{move: Move.up,score: this.validate(moveUp(this.world)) },
            {move: Move.down,score: this.validate(moveDown(this.world)) },
            {move: Move.left,score: this.validate(moveLeft(this.world)) },
            {move: Move.right,score: this.validate(moveRight(this.world)) }]     
    }

    private validate(nextMove:Point):number{
        if(nextMove.x == 0 || nextMove.x == this.world.width){
            return 0
        }

        if(nextMove.y == 0 || nextMove.x == this.world.height){
            return 0
        }
        return 1;
    }
}

// export class Movement {
//     readonly world: World
//     constructor(world:World) {
//         this.world = world; 
//     }

//     NextUp()
//     {

//     }

//     NextLeft(){

//     }

//     NextRight(){

//     }

//     NextDown(){

//     }
// }