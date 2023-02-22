import express, { urlencoded } from 'express';

var router = express.Router();

router.get('/', (req, res) => {
  res.type('html')
  res.send(`
    <p>Enter your username: </p>
    <input type="text" id="username"></input>
    <button onclick="startGame()">Done</button>
  `)
});



export default router;