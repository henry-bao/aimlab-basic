import express from 'express';
const gameRouter = express.Router();

gameRouter.post('/result', async (req, res) => {
    const gameResult = req.body;
    try {
        await req.models.Player.findOneAndUpdate(
            { username: req.session.account.username },
            { $push: { games: gameResult } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.json({ status: 'success' });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

export { gameRouter };
