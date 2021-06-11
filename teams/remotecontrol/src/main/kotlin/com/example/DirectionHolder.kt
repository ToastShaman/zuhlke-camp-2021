package com.example

import com.example.Direction.up
import org.http4k.client.WebsocketClient
import org.http4k.core.Uri
import java.util.concurrent.atomic.AtomicReference

fun DirectionHolder(controllerUri: Uri): AtomicReference<Direction> {
    val direction = AtomicReference(up)
    WebsocketClient.nonBlocking(controllerUri).onMessage {
        direction.set(Direction.valueOf(it.bodyString()))
    }
    return direction
}