import express from 'express';
const gameRouter = express.Router();

gameRouter.get('/', async (req, res) => {
    res.type('html');
    res.send(`

    <div id="game-result"></div>
    <div id="target">
    <button id="in-game-button" onclick="changePosition()">button</button>
    </div>
  `);
});

gameRouter.get('/prep', async (req, res) => {
    res.type('html');
    res.send(`
    <p>Enter your username: </p>
    <input type="text" id="username"></input>
    <button onclick="startGame()">Done</button>
  `);
});

gameRouter.get('/result', async (req, res) => {
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

gameRouter.post('/result', async (req, res) => {
    const gameResult = req.body;
    await req.models.Player.findOneAndUpdate(
        { username: req.session.account.username },
        { $push: { games: gameResult } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );
});

gameRouter.get(`/get-history`, async (req, res) => {
    let history = await req.models.Player.find({ username: req.session.account.username });

    res.json(history);
});

export { gameRouter };
