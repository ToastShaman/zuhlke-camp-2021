const {chromium} = require('playwright');

function readInputFromStdin(callback) {
    let input = '';

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', data => input += data);
    process.stdin.on('end', () => {
        const parsed = input.split("\n")
            .filter(it => it)
            .map(it => it.split(",").map(it => it.trim()))
            .map(it => {
                return {'name': it[0], 'host': it[1]}
            });
        callback(parsed);
    });
}

async function setupNewGame(snakes) {
    async function configureSnake(name, host, idx) {
        await page.fill(`#game_form_snakes_${idx}_url`, host)
        await page.fill(`#game_form_snakes_${idx}_name`, name)
    }

    async function configureBoardSize(width, height) {
        await page.fill('#game_form_width', width.toString());
        await page.fill('#game_form_height', height.toString());
    }

    async function configureMaxFood(amount) {
        await page.fill('#game_form_max_food', amount.toString());
    }

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3000/new');

    await configureBoardSize(20, 20);
    await configureMaxFood(3);
    for (const snake of snakes) {
        const idx = snakes.indexOf(snake);
        await configureSnake(snake.name, snake.host, idx);
    }

    await page.click("button");
    await page.click("text=Show");
    const gameUrl = await page.url();
    await browser.close();

    return gameUrl;
}

readInputFromStdin(snakes => {
    (async () => {
        const gameUrl = await setupNewGame(snakes);
        console.log(`New Game created at ${gameUrl}`)
    })();
});
