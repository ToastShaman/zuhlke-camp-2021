package com.zuhlke.znake.sidewinder.domain

import com.zuhlke.znake.sidewinder.domain.Move.*

data class Point(
    val x: Int,
    val y: Int
) {
    operator fun plus(move: Move) = when (move) {
        up -> x at y - 1
        right -> x + 1 at y
        down -> x at y + 1
        left -> x - 1 at y
    }

    fun surroundings() = listOf(
        x at y + 1,
        x at y - 1,
        x + 1 at y,
        x - 1 at y
    )
}

infix fun Point.directionTo(that: Point) = when {
    this.x < that.x -> right
    this.x > that.x -> left
    this.y < that.y -> down
    this.y > that.y -> up
    else -> null
}

infix fun Int.at(that: Int) = Point(this, that)
