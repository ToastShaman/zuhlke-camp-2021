package com.zuhlke.znake.sidewinder.strategy

import com.zuhlke.znake.sidewinder.domain.Point
import com.zuhlke.znake.sidewinder.domain.directionTo
import java.util.*
import kotlin.collections.ArrayDeque

fun SnakePane2D.calculateDistances(start: Point, end: Point): Distance {
    val queue = ArrayDeque<Pair<Point, Int>>()

    markVisited(start)
    setDistance(start, 0)
    queue.add(start to 0)

    while (queue.isNotEmpty()) {
        val (point, dist) = queue.removeFirst()

        if (point == end) {
            return Distance(dist, start, end, this)
        }

        point.surroundings().forEach {
            if (isValid(it) && !hasBeenVisited(it)) {
                setDistance(it, dist + 1)
                markVisited(it)
                queue.addLast(it to dist + 1)
            }
        }
    }

    return Distance(Int.MAX_VALUE, start, end, this)
}

data class Distance(
    val distance: Int,
    val start: Point,
    val end: Point,
    val pane: SnakePane2D
) {
    fun firstMove() = backtrack().firstOrNull { it != start }?.let { start directionTo it }

    fun backtrack(): List<Point> {
        return with(pane) {
            val queue = ArrayDeque<Point>()
            val path = LinkedList<Point>()

            queue.addFirst(end)

            while (queue.isNotEmpty()) {
                val point = queue.removeFirst()

                if (point == start) {
                    break
                }

                val next = point.surroundings()
                    .filter { pane.hasBeenVisited(it) }
                    .minByOrNull { this[it].distance }

                if (next != null) {
                    path.addFirst(next)
                    queue.addLast(next)
                }
            }
            path + listOf(end)
        }
    }
}
