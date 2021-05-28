package com.zuhlke.znake.znakestarter.api

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class ZnakeApi {

    @PostMapping("/start")
    fun start(@RequestBody request: StartRequest) = ResponseEntity.ok(StartResponse())

    @PostMapping("/move")
    fun move(@RequestBody world: World): ResponseEntity<Any> {
        println(world)

        // TODO: decide where you would like to move next
        return ResponseEntity.ok(MoveResponse(Move.up))
    }

    @PostMapping("/end")
    fun end(@RequestBody request: EndRequest) = ResponseEntity.ok().build<Any>()
}

