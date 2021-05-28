package com.zuhlke.znake.znakestarter.api.end

import kotlin.Int
import kotlin.String
import kotlin.collections.List

data class EndRequest(
    val game_id: Int,
    val winners: List<String>,
    val dead_snakes: DeadSnakes
)

data class DeadSnakes(
    val `data`: List<DeadSnake>
)

data class Death(
    val turn: Int,
    val causes: List<String>
)

data class DeadSnake(
    val id: String,
    val length: Int,
    val death: Death
)
