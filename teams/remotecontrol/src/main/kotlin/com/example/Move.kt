package com.example

import org.http4k.core.Body
import org.http4k.core.Method.POST
import org.http4k.core.Request
import org.http4k.core.Response
import org.http4k.core.Status.Companion.OK
import org.http4k.core.with
import org.http4k.format.Moshi.auto
import org.http4k.routing.RoutingHttpHandler
import org.http4k.routing.bind

fun Move(direction: () -> Direction): RoutingHttpHandler =
    "/move" bind POST to { req: Request ->
        val body = Body.auto<Move>().toLens()
        Response(OK).with(body of Move(direction()))
    }

enum class Direction {
    up, down, left, right
}

data class Move(val direction: Direction)
