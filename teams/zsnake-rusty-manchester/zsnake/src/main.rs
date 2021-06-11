use warp::Filter;
use serde_derive::{Deserialize, Serialize};
use warp::reply::Json;

#[tokio::main]
async fn main() {
    let start_handler = warp::path("start")
        .and(warp::body::json())
        .map(start_game);
    let end_handler = warp::path("end")
        .and(warp::body::json())
        .map(end_game);
    let move_handler = warp::path("move")
        .and(warp::body::json())
        .map(move_snake);

    let routes = warp::post()
        .and(start_handler
            .or(end_handler)
            .or(move_handler)
    );
    warp::serve(routes)
        .run(([0,0,0,0], 3030))
        .await;
}

#[derive(Deserialize, Serialize)]
struct StartRequest {
    game_id: u32,
    width: u32,
    height: u32,
}

#[derive(Deserialize, Serialize)]
struct StartResponse {
    color: String,
    secondary_color: String,
    head_url: String,
    taunt: String,
    head_type: String,
    tail_type: String,
}

#[derive(Deserialize, Serialize)]
struct EndRequest {
    game_id: u32,
    winners: Vec<String>,
    dead_snakes: DeadSnakes
}

#[derive(Deserialize, Serialize)]
struct DeadSnakes {
    data: Vec<DeadSnake>
}

#[derive(Deserialize, Serialize)]
struct DeadSnake {
    id: String,
    length: u32,
    death: Death
}

#[derive(Deserialize, Serialize)]
struct Death {
    turn: u32,
    causes: Vec<String>
}

#[derive(Deserialize, Serialize)]
struct EndResponse {}

#[derive(Deserialize, Serialize)]
struct World {
    id: u32,
    turn: u32,
    height: u32,
    width: u32,
    food: Food,
    snakes: Snakes,
    you: Snake
}

#[derive(Deserialize, Serialize)]
struct Food {
    data: Vec<Point>
}

#[derive(Deserialize, Serialize)]
struct Body {
    data: Vec<Point>
}

#[derive(Deserialize, Serialize)]
struct Point {
    x: u32,
    y: u32
}

#[derive(Deserialize, Serialize)]
struct Snakes {
    data: Vec<Snake>
}

#[derive(Deserialize, Serialize)]
struct Snake {
    body: Body,
    health: u32,
    id: String,
    length: u32,
    name: String,
    taunt: Option<String>
}

#[derive(Deserialize, Serialize)]
struct MoveResponse {
    #[serde(rename="move")]
    direction: Direction,
}

#[derive(Deserialize, Serialize)]
#[serde(rename_all="lowercase")]
enum Direction {
    Up,
    Right,
    Down,
    Left
}


fn start_game(_request: StartRequest) -> Json {

    let response = StartResponse {
        color: String::from("#e89910"),
        secondary_color: String::from("#000000"),
        head_url: String::from("https://avatars.dicebear.com/api/identicon/rust.svg"),
        taunt: String::from("Manage that at runtime"),
        head_type: String::from("shades"),
        tail_type: String::from("regular"),
    };

    return warp::reply::json(&response)
}

fn end_game(_request: EndRequest) -> Json{
    return warp::reply::json(&EndResponse{})
}

fn move_snake(request: World) -> Json {

    //selfPosition
    let position = request.you.body[0];


    //findFood
    let nearest_food = find_nearest_food(position, request.food.data);
    let move_direction = nearest_food.map_or(Direction::Up, | food_position | {
        calculate_direction(positon,food_position)
    });

    //self collision
    //snake collision

    let response = MoveResponse {
        direction: move_direction
    };

    return warp::reply::json(&response)
}

fn find_nearest_food(position: Point, food: Vec<Point>) -> Option<&Point> {
    return food.first()

}

fn calculate_direction(position: Point, food: &Point) -> Direction{
    return if food.x > position.x {
        Direction::Right
    } else if food.x < position.x {
        Direction.Left
    } else if food.y > position.y {
        Direction.Up
    } else {
        Direction.Down
    }
}