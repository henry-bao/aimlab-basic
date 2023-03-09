import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    res.type('html');
    res.send(`

    <div id="game-result"></div>
    <div id="target">
    <button id="in-game-button" onclick="changePosition()">button</button>
    </div>
  `);
});

router.get('/prep', async (req, res) => {
    res.type('html');
    res.send(`
    <p>Enter your username: </p>
    <input type="text" id="username"></input>
    <button onclick="startGame()">Done</button>
  `);
});

router.get('/result', async (req, res) => {
    // Get resutls from database
    try {
        let games = await req.models.Player.find();
        // console.log(games);
        // Sort games in descending order by score and then by accuracy
        games.sort((a, b) => {
            if (a.score === b.score) {
                return b.accuracy - a.accuracy;
            } else {
                return b.score - a.score;
            }
        });
        res.json(games);
    } catch (error) {
        res.status(500).json({ status: 'failure', error: error.toString() });
    }
});

router.post('/result', async (req, res) => {
    console.log(req.body);
    const newResult = new req.models.Player({
        username: req.body.username,
        score: req.body.score,
        accuracy: req.body.accuracy,
        game_date: Date.now(),
    });
    await newResult.save();
});

export { router as gameRouter };