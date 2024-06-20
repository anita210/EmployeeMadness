// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  assignedEquipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
  favouriteBrand: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }],
  created: {
    type: Date,
    default: Date.now,
  },
  experience: Number,
  startingDate: {
    type: Date,
    default: Date.now
  },
  salary: Number,
  desiredSalary: Number,
  favouriteColor: String,
  kittens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kitten' }],
  favouriteBoardGame: [{ type: mongoose.Schema.Types.Number, ref: 'BoardGame' }],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
