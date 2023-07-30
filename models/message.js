const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 30 },
  message: { type: String, required: true, minLength: 5, maxLength: 300 },
  time_stamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);