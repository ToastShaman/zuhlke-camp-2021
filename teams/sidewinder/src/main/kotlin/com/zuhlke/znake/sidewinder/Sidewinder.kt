package com.zuhlke.znake.sidewinder

import com.google.gson.Gson
import com.zuhlke.znake.sidewinder.api.move.MoveResponse
import com.zuhlke.znake.sidewinder.api.move.World
import com.zuhlke.znake.sidewinder.api.start.StartResponse
import com.zuhlke.znake.sidewinder.strategy.HungrySnake
import spark.Request
import spark.Response
import spark.Spark.*

object Sidewinder {

    @JvmStatic
    fun main(args: Array<String>) {
        val gson = Gson()

        port(9090)

        path("/") {
            post("/start", "application/json", Start(), gson::toJson)
            post("/move", "application/json", Move(gson), gson::toJson)
            post("/end", "application/json", End(), gson::toJson)
        }

        after("/*") { _, response ->
            response.type("application/json")
        }
    }
}

fun Start() = { _: Request, _: Response -> StartResponse() }

fun Move(gson: Gson) = { req: Request, _: Response ->
    val world = gson.fromJson(req.body(), World::class.java).also(::println)
    MoveResponse(HungrySnake(world))
}

fun End() = { _: Request, res: Response -> res.status(200) }

