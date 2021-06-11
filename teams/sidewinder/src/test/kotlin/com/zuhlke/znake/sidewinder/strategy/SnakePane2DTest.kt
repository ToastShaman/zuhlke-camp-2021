package com.zuhlke.znake.sidewinder.strategy

import com.zuhlke.znake.sidewinder.domain.at
import com.zuhlke.znake.sidewinder.strategy.SnakePane2D
import com.zuhlke.znake.sidewinder.strategy.SnakePane2D.Companion.ContentPrinter
import com.zuhlke.znake.sidewinder.strategy.SnakePane2D.Companion.DistancePrinter
import com.zuhlke.znake.sidewinder.strategy.SnakePane2D.Companion.VisitedPrinter
import com.zuhlke.znake.sidewinder.strategy.calculateDistances
import org.junit.jupiter.api.Test

class SnakePane2DTest {

    @Test
    fun `finds closest distance to food`() {
        val world = SnakePane2D(
            dimension = 20,
            food = listOf(10 at 18),
            snakes = listOf(1 at 1, 9 at 18, 9 at 17, 10 at 17)
        )

        println(world.display(ContentPrinter))

        val distance = world.calculateDistances(1 at 1, 10 at 18)

        with(distance.pane) {
            println(display(DistancePrinter))
            println(display(VisitedPrinter))
            println(plot(distance.backtrack().also { println(it) }))
        }
    }
}