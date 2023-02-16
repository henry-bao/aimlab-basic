import mongoose from 'mongoose'

let models = {}

console.log("trying to connect db")

await mongoose.connect('mongodb+srv://Russ:pa55word@cluster0.sseiyjf.mongodb.net/AimLabBasic')

console.log("successfully connected to mongodb")

const playerSchema = new mongoose.Schema({
  username: String,
  score: Number,
  accuracy: Number,
  game_date: Date
})


models.Player = mongoose.model('Player', playerSchema)
console.log("mongoose schema created")


export default models





