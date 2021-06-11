package com.example

import org.http4k.client.WebsocketClient
import org.http4k.core.Uri
import org.http4k.routing.routes

fun ZSnakeApp(controllerUri: Uri) = routes(
    Start(),
    Move(WebsocketClient.blocking(controllerUri).received().iterator())
)
