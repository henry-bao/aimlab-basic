import express, { urlencoded } from 'express';

var router = express.Router();

// Test
router.post('/', async (req, res) => {
  console.log(req.body)
  const newResult = new req.models.Player({
    username: req.body.username,
    score: req.body.score,
    accuracy: req.body.accuracy,
    game_date: Date.now()
  })
  await newResult.save()
});



export default router;