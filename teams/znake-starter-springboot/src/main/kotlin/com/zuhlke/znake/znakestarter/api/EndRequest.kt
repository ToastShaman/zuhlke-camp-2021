package com.zuhlke.znake.znakestarter.api

import kotlin.Number
import kotlin.String
import kotlin.collections.List

data class EndRequest(
    val game_id: Number,
    val winners: List<String>,
    val dead_snakes: DeadSnakes
)

data class DeadSnakes(
    val `data`: List<DeadSnake>
)

data class Death(
    val turn: Number,
    val causes: List<String>
)

data class DeadSnake(
    val id: String,
    val length: Number,
    val death: Death
)
