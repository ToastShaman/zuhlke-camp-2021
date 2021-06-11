package com.example

import org.http4k.core.Uri
import org.http4k.routing.routes

fun ZSnakeApp(controllerUri: Uri) = routes(
    Start(),
    Move(DirectionHolder(controllerUri)::get)
)
