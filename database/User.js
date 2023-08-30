const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  city: String,
  street: String,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 1 },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  token: { type: String },
  createdAt: { type: Date, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
  bestFriend: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  // hobbies: [String],
  address: addressSchema,
});

// this sayHi method will be availible to the all user instances
userSchema.methods.sayHi = function () {
  console.log(`hi my name is ${this.name}`);
};

// this is the static level function that is availible to the whole model instances
userSchema.statics.findByName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

userSchema.query.findName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

module.exports = mongoose.model("users", userSchema);
