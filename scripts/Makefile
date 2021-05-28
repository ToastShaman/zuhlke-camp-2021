new-game: install
	cat $(CONFIG) | node ./new-game/index.js
.PHONY: new-game

locals: install
	cat local.snakes.txt | node ./new-game/index.js
.PHONY: locals

starters: install
	cat starter.snakes.txt | node ./new-game/index.js
.PHONY: starters

install:
	cd ./new-game && npm install > /dev/null
.PHONY: install
