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

userRouter.post('/save-user-info', async (req, res) => {});

userRouter.get('/load-user-info', async (req, res) => {});

export { userRouter };
