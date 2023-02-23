import express, { urlencoded } from 'express';

var router = express.Router();

router.get('/', (req, res) => {
  res.type('html')
  res.send(`
    <div id="target">
    <button onclick="changePosition()">button</button>
    </div>
  `)
});



export default router;