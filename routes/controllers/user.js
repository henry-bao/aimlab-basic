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
    try {
        if (req.query?.type === 'accuracy') {
            const user = await req.models.Player.aggregate([
                { $unwind: '$games' },
                {
                    $group: {
                        _id: '$username',
                        data: { $avg: '$games.accuracy' },
                    },
                },
                { $sort: { data: -1 } },
                { $limit: 10 },
            ]);
            if (!user.length) {
                return res.json([]);
            }
            user.forEach((user) => {
                user.data = `${user.data.toFixed(2)}%`;
            });
            return res.json(user);
        } else if (req.query?.type === 'games') {
            const user = await req.models.Player.aggregate([
                // max 10 players
                { $unwind: '$games' },
                {
                    $group: {
                        _id: '$username',
                        data: { $sum: 1 },
                    },
                },
                { $sort: { data: -1 } },
                { $limit: 10 },
            ]);
            if (!user.length) {
                return res.json([]);
            }
            return res.json(user);
        } else {
            return res.json([]);
        }
    } catch (error) {
        if (!user.length) {
            return res.json([]);
        }
    }
});

userRouter.get(`/get-history`, async (req, res) => {
    try {
        const history = await req.models.Player.findOne({ username: req.query.username });
        if (!history) {
            return res.json([]);
        }
        res.json(history.games);
    } catch (error) {
        res.json([]);
    }
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
