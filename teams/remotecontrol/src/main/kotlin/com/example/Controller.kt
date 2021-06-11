package com.example

import com.example.Direction.down
import com.example.Direction.left
import com.example.Direction.right
import com.example.Direction.up
import org.http4k.routing.bind
import org.http4k.routing.websockets
import org.http4k.server.Undertow
import org.http4k.server.asServer
import org.http4k.websocket.Websocket
import org.http4k.websocket.WsMessage
import java.util.concurrent.BlockingDeque
import java.util.concurrent.LinkedBlockingDeque

fun Controller(seq: BlockingDeque<Direction>) = websockets(
    "/" bind { ws: Websocket ->
        while (true) ws.send(WsMessage(seq.take().name))
    }
)

object ControllerRunner {
    @JvmStatic
    fun main() {
        val queue = LinkedBlockingDeque<Direction>()

        Controller(queue).asServer(Undertow(9091)).start()

        while (true) {
            when (System.`in`.read()) {
                'w'.toInt() -> queue.add(up)
                's'.toInt() -> queue.add(down)
                'a'.toInt() -> queue.add(left)
                'd'.toInt() -> queue.add(right)
            }
        }
    }
}
