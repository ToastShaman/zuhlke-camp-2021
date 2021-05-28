package com.zuhlke.znake.znakestarter.api.start

data class StartResponse(
    val color: String = "#41EAD4",
    val secondary_color: String = "#E952DE",
    val head_url: String = "https://avatars.dicebear.com/api/identicon/springboot.svg",
    val taunt: String = "Embrace the NULL",
    val head_type: Head = Head.bendr,
    val tail_type: Tail = Tail.pixel
)