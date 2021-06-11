package com.example

import org.http4k.client.JavaHttpClient
import org.http4k.core.Method.POST
import org.http4k.core.Request
import kotlin.concurrent.thread

fun main() {
    thread {
        ControllerRunner.main()
    }

    Thread.sleep(2000)

    ZSnakeDavidD.main()

    val http = JavaHttpClient()

    http(Request(POST, "http://localhost:9090/start"))

    while (true) {
        println("NEXT MOVE" + http(Request(POST, "http://localhost:9090/move")))
    }
}