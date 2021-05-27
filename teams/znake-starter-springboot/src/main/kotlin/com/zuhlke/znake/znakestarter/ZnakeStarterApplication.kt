package com.zuhlke.znake.znakestarter

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ZnakeStarterApplication

fun main(args: Array<String>) {
	runApplication<ZnakeStarterApplication>(*args)
}
