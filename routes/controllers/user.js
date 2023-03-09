import express from 'express';

const router = express.Router();

router.get('/myIdentity', (req, res) => {
    if (req.session.isAuthenticated) {
        res.send({
            status: 'loggedin',
            userInfo: {
                name: req.session.account.name,
                username: req.session.account.username,
            },
        });
    } else {
        res.send({ status: 'loggedout' });
    }
});

router.post('/save-user-info', async (req, res) => {});

router.get('/load-user-info', async (req, res) => {});

export { router as userRouter };
