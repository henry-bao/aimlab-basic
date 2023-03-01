import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import msIdExpress from 'microsoft-identity-express';

import gamePrepRoute from './routes/gamePrep.js';
import gameRoute from './routes/game.js';
import gameResultRoute from './routes/gameResult.js';
import models from './models.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, _res, next) => {
    req.models = models;
    next();
});

const oneDay = 1000 * 60 * 60 * 24;
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false,
    })
);

const appSettings = {
    appCredentials: {
        clientId: process.env.CLIENT_ID,
        tenantId: process.env.TENANT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    },
    authRoutes: {
        redirect:
            process.env.NODE_ENV === 'prod' ? 'https://aimlab.bao.lol/redirect' : 'http://localhost:3000/redirect',
        error: '/error',
        unauthorized: '/unauthorized',
    },
};
const msId = new msIdExpress.WebAppAuthClientBuilder(appSettings).build();
app.use(msId.initialize());

app.get('/signin', msId.signIn({ postLoginRedirect: '/' }));
app.get('/signout', msId.signOut({ postLogoutRedirect: '/' }));
app.get('/error', (_req, res) => res.status(500).send('There was a server error.'));
app.get('/unauthorized', (_req, res) => res.status(401).send('You are not authorized.'));

app.use('/gamePrep', gamePrepRoute);
app.use('/game', gameRoute);
app.use('/gameResult', gameResultRoute);

export default app;
