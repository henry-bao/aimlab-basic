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


router.get('/' , async (req, res) => {
  // Get resutls from database
  try {
    let games = await req.models.Player.find();
    // console.log(games);
    // Sort games in descending order by score and then by accuracy
    games.sort((a, b) => {
      if (a.score === b.score) {
        return b.accuracy - a.accuracy;
      } else {
        return b.score - a.score;
      }
    });
    res.json(games);
  } catch (error) {
    res.status(500).json({ 'status': 'failure', 'error': error.toString() })
  }
});


export default router;