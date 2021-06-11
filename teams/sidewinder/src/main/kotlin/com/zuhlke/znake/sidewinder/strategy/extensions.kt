package com.zuhlke.znake.sidewinder.strategy

import com.zuhlke.znake.sidewinder.api.move.World

fun World.me() = you.body.data.first()
fun World.snakePane2D() = SnakePane2D(width, height, snakes(), foods())
fun World.foods() = food.data
fun World.snakes() = snakes.data.flatMap { it.body.data }
