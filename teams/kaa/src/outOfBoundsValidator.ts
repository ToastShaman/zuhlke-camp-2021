// import { World } from "./api";
// import { Up } from "./Movement";

// export class OutOfBoundsValidator {
//     readonly move:Up
//     readonly world:World
//     constructor(move: Up, world: World) {
//         this.move = move
//         this.world = world
//     }

//     public ValidateMove() : number{
//         var nextMove = this.move.NextMove()

//         if(nextMove.x == 0 || nextMove.x == this.world.width){
//             return 0
//         }

//         if(nextMove.y == 0 || nextMove.x == this.world.height){
//             return 0
//         }

//         return 1;
//     }
// }