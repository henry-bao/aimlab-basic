import express from 'express';

const userRouter = express.Router();

userRouter.get('/get-identity', async (req, res) => {
    if (req.session.isAuthenticated) {
        const user = await req.models.Player.findOne({ username: req.session.account.username });
        if (!user) {
            await req.models.Player.create({
                username: req.session.account.username,
                user: req.session.account.name,
                games: [],
            });
        }
        res.json({
            status: 'loggedin',
            userInfo: {
                name: req.session.account.name,
                username: req.session.account.username,
            },
        });
    } else {
        res.json({ status: 'loggedout' });
    }
});

userRouter.get('/leaderboard', async (req, res) => {
    let user = await req.models.Player.aggregate([
        { $unwind: '$games' },
        {
            $group: {
                _id: '$username',
                maxScore: { $max: '$games.hit' },
            },
        },
    ]);
    if (!user.length) {
        return res.json([]);
    }
    user = user.sort((a, b) => b.maxScore - a.maxScore);
    return res.json(user);
});

userRouter.get(`/get-history`, async (req, res) => {
    let history = await req.models.Player.find({ username: req.session.account.username });

    res.json(history);
});


export { userRouter };
