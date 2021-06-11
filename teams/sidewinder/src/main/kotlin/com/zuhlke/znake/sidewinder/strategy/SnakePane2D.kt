package com.zuhlke.znake.sidewinder.strategy

import com.zuhlke.znake.sidewinder.domain.Point
import com.zuhlke.znake.sidewinder.strategy.TileContent.*

data class Tile(
    val x: Int = 0,
    val y: Int = 0,
    val content: TileContent = None,
    val visited: Boolean = false,
    val distance: Int = 0,
    val point: Point = Point(x, y)
)

enum class TileContent {
    Food, Snake, None
}

class SnakePane2D(
    private val width: Int,
    private val height: Int,
    snakes: List<Point>,
    foods: List<Point>
) {

    constructor(
        dimension: Int,
        snakes: List<Point> = emptyList(),
        food: List<Point> = emptyList()
    ) : this(dimension, dimension, snakes, food)

    private val pane: Array<Array<Tile>> = Array(width) { Array(height) { Tile() } }

    init {
        pane.forEachIndexed { y, row ->
            row.forEachIndexed { x, _ ->
                pane[y][x] = Tile(x, y)
            }
        }

        snakes.forEach { (x, y) -> pane[y][x] = Tile(x, y, content = Snake) }
        foods.forEach { (x, y) -> pane[y][x] = Tile(x, y, content = Food) }
    }

    fun markVisited(point: Point) {
        set(point, get(point).copy(visited = true))
    }

    fun setDistance(point: Point, distance: Int) {
        set(point, get(point).copy(distance = distance))
    }

    fun isValid(point: Point) = when {
        !isOnBoard(point) -> false
        get(point).content == Snake -> false
        else -> true
    }

    private fun isOnBoard(point: Point) = when {
        point.x !in 0 until width -> false
        point.y !in 0 until height -> false
        else -> true
    }

    fun hasBeenVisited(point: Point) = isOnBoard(point) && get(point).visited

    operator fun get(point: Point) = pane[point.y][point.x]
    operator fun set(point: Point, tile: Tile) {
        pane[point.y][point.x] = tile
    }

    override fun toString() = display(ContentPrinter)

    fun display(fn: (Tile) -> String) = pane
        .map { row -> row.map(fn).joinToString(separator = " ") { it } }
        .joinToString(separator = "\n") { it } + "\n"

    fun plot(points: List<Point>) = display {
        if (points.contains(it.point)) "x" else "\u26AC"
    }

    companion object {
        val ContentPrinter: (Tile) -> String = { tile ->
            when (tile.content) {
                Food -> "F"
                Snake -> "S"
                None -> "\u26AC"
            }
        }

        val DistancePrinter: (Tile) -> String = { tile ->
            tile.distance.toString().padStart(2, ' ')
        }

        val VisitedPrinter: (Tile) -> String = { tile ->
            when (tile.visited) {
                true -> "T"
                else -> "\u26AC"
            }
        }
    }
}
