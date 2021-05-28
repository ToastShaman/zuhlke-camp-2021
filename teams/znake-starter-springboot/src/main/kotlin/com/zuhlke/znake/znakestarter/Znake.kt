package com.zuhlke.znake.znakestarter

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class Znake

fun main(args: Array<String>) {
	runApplication<Znake>(*args)
}
