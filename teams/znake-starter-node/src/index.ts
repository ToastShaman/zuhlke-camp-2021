import express, {Express, NextFunction, Request, Response} from 'express';
import {Move, MoveResponse, StartRequest, StartResponse, World} from "./api";
import logger from "morgan";
import createError, {HttpError} from "http-errors";

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

    // TODO: decide where you would like to move next
    res.json(new MoveResponse(Move.up))
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
