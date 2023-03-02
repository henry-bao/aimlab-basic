import express, { urlencoded } from 'express';

var router = express.Router();

router.get('/', (req, res) => {
    res.type('html');
    res.send(`

    <div id="game-result"></div>
    <div id="target">
    <button id="in-game-button" onclick="changePosition()">button</button>
    </div>
  `);
});

export default router;
