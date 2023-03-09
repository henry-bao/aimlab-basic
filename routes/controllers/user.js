import express from 'express';

const userRouter = express.Router();

userRouter.get('/get-identity', (req, res) => {
    if (req.session.isAuthenticated) {
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
