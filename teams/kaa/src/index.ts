import express, {Express, NextFunction, Request, Response} from 'express';
import {Move, MoveResponse, StartRequest, StartResponse, World} from "./api";
import logger from "morgan";
import createError, {HttpError} from "http-errors";
import {DoNotEatOtherSnakes, DoNotEatYourself, FindFood, Movement, OutOfBoundsValidator} from './snake';

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
        new DoNotEatYourself(world),
        new DoNotEatOtherSnakes(world),
        new FindFood(world)
    ]

    let movements = validators
        .map(v => v.movements());

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
    let movement = nextMove(world);
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
