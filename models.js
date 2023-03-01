import mongoose from 'mongoose';

let models = {};

console.log('trying to connect db');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI);

console.log('successfully connected to mongodb');

const playerSchema = new mongoose.Schema({
    username: String,
    score: Number,
    accuracy: Number,
    game_date: Date,
});

models.Player = mongoose.model('Player', playerSchema);
console.log('mongoose schema created');

export default models;
