package com.zuhlke.znake.znakestarter.api

data class StartResponse(
    val color: String = "#FF0000",
    val secondary_color: String = "#00FF00",
    val head_url: String = "http://tinygraphs.com/spaceinvaders/tinygraphs?theme=sugarsweets&numcolors=2&size=220&fmt=png",
    val taunt: String = "OH GOD NOT THE BEES",
    val head_type: Head = Head.bendr,
    val tail_type: Tail = Tail.pixel
)