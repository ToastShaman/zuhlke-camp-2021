package com.zuhlke.znake.sidewinder.api.move

import com.zuhlke.znake.sidewinder.domain.Point

data class World(
    val id: Int,
    val turn: Int,
    val height: Int,
    val width: Int,
    val food: Food,
    val snakes: Snakes,
    val you: Snake
)

data class Food(
    val `data`: List<Point>,
)

data class Body(
    val `data`: List<Point>,
)

data class Snakes(
    val `data`: List<Snake>,
)

data class Snake(
    val body: Body,
    val health: Int,
    val id: String,
    val length: Int,
    val name: String,
    val taunt: String?
)
