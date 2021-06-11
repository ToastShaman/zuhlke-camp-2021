package com.zuhlke.znake.sidewinder.api.start

data class StartResponse(
    val color: String = "#F906FB",
    val secondary_color: String = "#127475",
    val head_url: String = "https://avatars.dicebear.com/api/identicon/sidewinder.svg",
    val taunt: String = "Sidewinder the hungriest",
    val head_type: Head = Head.bendr,
    val tail_type: Tail = Tail.pixel
)