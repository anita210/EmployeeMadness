const mongoose = require("mongoose");

const { Schema } = mongoose;

const BoardGameSchema = new Schema({
  name: String,
  maxPlayers: Number
});

module.exports = mongoose.model("BoardGame", BoardGameSchema);