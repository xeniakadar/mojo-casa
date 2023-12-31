const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 30 },
  text: { type: String, required: true, minLength: 5, maxLength: 300 },
  userid: { type: String },
  time_stamp: { type: String },
  username: { type: String },
  avatar: { type: String },
});

module.exports = mongoose.model("Message", MessageSchema);
