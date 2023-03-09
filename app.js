import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import msIdExpress from 'microsoft-identity-express';

import models from './models.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { apiRouter } from './routes/index.js';

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
        secret: '0tkaDAE4qceMretpQJhVrMDuExeFkAYjMwfkG4A1po8',
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false,
    })
);

const appSettings = {
    appCredentials: {
        clientId: '3aed049a-dcfc-444f-9704-ed029702835a',
        tenantId: 'f6b6dd5b-f02f-441a-99a0-162ac5060bd2',
        clientSecret: '.mF8Q~5Mkv_SS26OrGKeCYWz2fbvNmiC6B0lxbM-',
    },
    authRoutes: {
        redirect: 'https://aimlab.bao.lol/redirect',
        error: '/error',
        unauthorized: '/unauthorized',
    },
};
const msId = new msIdExpress.WebAppAuthClientBuilder(appSettings).build();

app.use(msId.initialize());

app.get('/login', msId.signIn({ postLoginRedirect: '/' }));
app.get('/logout', msId.signOut({ postLogoutRedirect: '/' }));
app.get('/error', (_req, res) => res.status(500).send('There was a server error.'));
app.get('/unauthorized', (_req, res) => res.status(401).send('You are not authorized.'));

app.use('/api', apiRouter);

export default app;
