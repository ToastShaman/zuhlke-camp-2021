import express, {Express, NextFunction, Request, Response} from 'express';
import {Move, MoveResponse, StartRequest, StartResponse, World} from "./api";
import logger from "morgan";
import createError, {HttpError} from "http-errors";
import {DoNotEatYourself, Movement, OutOfBoundsValidator} from './movementFile';
// import { OutOfBoundsValidator } from './Movement';

const port: number = 9090
const app: Express = express();

app.use(logger('dev'));
app.use(express.json());

app.post("/start", (req: Request, res: Response) => {
    const request = req.body as StartRequest

    res.json(new StartResponse())
});

function findMovement(movements: Movement[], move: Move): Movement {
    return movements.find(x => x.move === move)!!;
}

function calculateScores(currentValue: Movement[], accumulator: Movement[], move: Move): Movement {
    return {
        move: move,
        score: findMovement(currentValue, move).score + findMovement(accumulator, move).score
    };
}

function nextMove(world: World): Movement {
    let validators = [
        new OutOfBoundsValidator(world),
        new DoNotEatYourself(world)
    ]

    let movements = validators
        .map(v => v.movements());

    console.log(JSON.stringify(movements))

    return movements

        .reduce((accumulator, currentValue) => [
            calculateScores(currentValue, accumulator, Move.up),
            calculateScores(currentValue, accumulator, Move.down),
            calculateScores(currentValue, accumulator, Move.left),
            calculateScores(currentValue, accumulator, Move.right),
        ])
        .sort((a, b) => b.score - a.score)[0];
}

app.post("/move", (req: Request, res: Response) => {
    const world = req.body as World

    console.log(JSON.stringify(world))

    //determine the best possible Move,
    //for each direction, what is the most successful,
    //compare each direction's score
    //chose the highest score

    let movement = nextMove(world);

    console.log(JSON.stringify(movement))

    // TODO: decide where you would like to move next
    res.json(new MoveResponse(movement.move))
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
