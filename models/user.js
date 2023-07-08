const mongoose =require("mongoose");

const  userSchema = new mongoose.Schema({
    name: String,
    Age: Number,
    Mobile: Number,
    reason: String,
    gender: String
})

const User =mongoose.model('User', userSchema)

module.exports = User