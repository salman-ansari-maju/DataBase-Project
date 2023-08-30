const mongoose = require("mongoose");

const tweet = new mongoose.Schema({
  userID: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  tweet: String,
  createdAt: { type: Date, default: () => Date.now() },
});
module.exports = mongoose.model("posts", tweet);
