package com.zuhlke.znake.sidewinder.strategy

import com.zuhlke.znake.sidewinder.api.move.World
import com.zuhlke.znake.sidewinder.domain.Move
import com.zuhlke.znake.sidewinder.domain.directionTo

object RandomNextMove : SnakeStrategy {
    override fun invoke(world: World): Move {
        val pane = world.snakePane2D()
        val start = world.me()

        return start.surroundings()
            .filter(pane::isValid)
            .map { start directionTo it }
            .randomOrNull() ?: Move.up
    }
}