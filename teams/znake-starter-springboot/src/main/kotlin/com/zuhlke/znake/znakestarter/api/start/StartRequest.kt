package com.zuhlke.znake.znakestarter.api.start

data class StartRequest(
    val game_id: Int,
    val width: Int,
    val height: Int
)