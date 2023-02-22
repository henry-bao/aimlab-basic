import express, { urlencoded } from 'express';

var router = express.Router();

router.get('/', (req, res) => {
  res.type('html')
  res.send(`
    <button id="target" onclick="changePosition()">Click here to start</button>
  `)
});



export default router;