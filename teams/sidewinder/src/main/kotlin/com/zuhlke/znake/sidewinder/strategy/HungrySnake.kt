package com.zuhlke.znake.sidewinder.strategy

import com.zuhlke.znake.sidewinder.api.move.World
import com.zuhlke.znake.sidewinder.domain.Move

object HungrySnake : SnakeStrategy {

    override fun invoke(world: World): Move {
        val health = world.you.health
        val closestFood = findClosestFood(world)
        val randomMove = RandomNextMove(world)

        return when {
            closestFood == null -> randomMove
            (health - 10) > closestFood.distance -> randomMove
            else -> closestFood.firstMove() ?: Move.up
        }
    }

    private fun findClosestFood(world: World) = world
        .foods()
        .map { food -> world.snakePane2D().calculateDistances(world.me(), food) }
        .groupBy { it.distance }
        .minByOrNull { it.key }
        ?.value
        ?.firstOrNull()
}
