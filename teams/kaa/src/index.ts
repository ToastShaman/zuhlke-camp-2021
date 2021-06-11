import express, { Express, NextFunction, Request, Response } from 'express';
import { Move, MoveResponse, StartRequest, StartResponse, World } from "./api";
import logger from "morgan";
import createError, { HttpError } from "http-errors";
import { OutOfBoundsValidator } from './movementFile';
// import { OutOfBoundsValidator } from './Movement';

const port: number = 9090
const app: Express = express();

app.use(logger('dev'));
app.use(express.json());

app.post("/start", (req: Request, res: Response) => {
    const request = req.body as StartRequest

    res.json(new StartResponse())
});

app.post("/move", (req: Request, res: Response) => {
    const world = req.body as World

    console.log(JSON.stringify(world))

    //determine the best possible Move,
    //for each direction, what is the most successful,
    //compare each direction's score
    //chose the highest score


    var outOfBoundsValidator = new OutOfBoundsValidator(world)
    var movements = outOfBoundsValidator.movements()

    var firstMovement = movements.sort((a, b) =>  b.score -a.score)[0]

    console.log(JSON.stringify(movements))
    console.log(JSON.stringify(firstMovement))

    // TODO: decide where you would like to move next
    res.json(new MoveResponse(firstMovement.move))
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
