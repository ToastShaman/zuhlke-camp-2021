package com.zuhlke.znake.sidewinder.api.start

data class StartRequest(
    val game_id: Int,
    val width: Int,
    val height: Int
)