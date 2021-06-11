package com.zuhlke.znake.sidewinder.strategy

import com.zuhlke.znake.sidewinder.api.move.World
import com.zuhlke.znake.sidewinder.domain.Move

typealias SnakeStrategy = (World) -> Move
