import express, { urlencoded } from 'express';

var router = express.Router();

// Test
router.get('/', (req, res) => {
  res.send("working")
});



export default router;