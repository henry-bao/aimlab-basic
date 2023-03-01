import mongoose from 'mongoose';

let models = {};

const playerSchema = new mongoose.Schema({
    username: String,
    score: Number,
    accuracy: Number,
    game_date: Date,
});

models.Player = mongoose.model('Player', playerSchema);
console.log('mongoose schema created');

export default models;
