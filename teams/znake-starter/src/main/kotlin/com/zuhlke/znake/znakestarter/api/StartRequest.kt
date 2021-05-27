package com.zuhlke.znake.znakestarter.api

data class StartRequest(
    val game_id: Int,
    val width: Int,
    val height: Int
)