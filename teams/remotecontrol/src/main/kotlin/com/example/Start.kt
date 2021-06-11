package com.example

import org.http4k.core.Body
import org.http4k.core.Method.POST
import org.http4k.core.Response
import org.http4k.core.Status.Companion.OK
import org.http4k.core.with
import org.http4k.format.Moshi.auto
import org.http4k.routing.bind

fun Start() = "/start" bind POST to {
    val bodyLens = Body.auto<StartResponse>().toLens()
    Response(OK).with(bodyLens of StartResponse())
}

data class StartResponse(
    val color: String = "#fc9d03",
    val secondary_color: String = "#035efc",
    val head_url: String = "https://www.menkind.co.uk/media/catalog/product/cache/84a9762dea65cd4d66747ad9a34bdb64/7/4/74057-pac-man_mini_arcade_machine_w1.jpg",
    val taunt: String = "hoo yah!",
    val head_type: String = "pixel",
    val tail_type: String = "pixel"
)