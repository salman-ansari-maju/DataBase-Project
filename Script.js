const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect(
  "mongodb+srv://sp19bscs0038:ansari123@cluster0.mgcjt2g.mongodb.net/practice-db"
);
run();
async function run() {
  try {
    const user = await new User({
      name: "Salman",
      age: 25,
      email: "Sally@kyle.com",
      hobbies: ["gym", "cricket"],
      address: { city: "karachi" },
    });

    await user.save();
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
}

// console.log("Hi");
