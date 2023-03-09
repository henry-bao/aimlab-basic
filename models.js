import mongoose from 'mongoose';

let models = {};

const gameSchema = new mongoose.Schema({
    round: Number,
    hit: Number,
    seconds: Number,
    accuracy: Number,
    game_date: Date,
});

const playerSchema = new mongoose.Schema({
    username: String,
    user: String,
    games: [gameSchema],
});

models.Player = mongoose.model('Player', playerSchema);
console.log('mongoose schema created');

export default models;
