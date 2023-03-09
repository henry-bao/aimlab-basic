import e from 'express';
import express from 'express';

const userRouter = express.Router();

userRouter.get('/get-identity', async (req, res) => {
    try {
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
    } catch (error) {
        res.json({ status: 'error', message: error.message });
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
    const history = await req.models.Player.findOne({ username: req.query.username });
    res.json(history.games);
});

userRouter.get('/load-user-info', async (req, res) => {
    try {
        const user = await req.models.Player.findOne({ username: req.query.username });
        if (user) {
            return res.json({
                user: user.user,
                username: user.username,
            });
        } else {
            return res.json({ status: 'error', message: 'User not found' });
        }
    } catch (error) {
        return res.json({ status: 'error', message: error.message });
    }
});

export { userRouter };
