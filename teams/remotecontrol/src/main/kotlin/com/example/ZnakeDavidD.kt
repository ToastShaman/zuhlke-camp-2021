package com.example

import org.http4k.core.Uri
import org.http4k.server.SunHttp
import org.http4k.server.asServer

object ZSnakeDavidD {
    @JvmStatic
    fun main() {
        ZSnakeApp(Uri.of("ws://localhost:9091/")).asServer(SunHttp(9090)).start().also {
            println("Server started on " + it.port())
        }
    }
}
