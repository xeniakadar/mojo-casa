const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 25 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  membership_status: { type: Boolean, default: false },
  admin_status: { type: Boolean, default: false },
  avatar: { type: String, default: 'ken.jpeg' }
});

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
