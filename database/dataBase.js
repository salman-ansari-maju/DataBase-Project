const mongoose = require("mongoose");
const User = require("./User");

async function connectToCluster() {
  let mongoClient;

  try {
    mongoClient = mongoose.connect(
      "mongodb+srv://sp19bscs0038:ansari123@cluster0.mgcjt2g.mongodb.net/practice-db"
    );
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

module.exports = connectToCluster;

//////////Web Dev Simplified :VEDIO NAME(Mongoose Crash Course - Beginner Through Advanced)-TIME (0:00 min TO 28:00 min)

// run();
async function run() {
  try {
    // const user = await User.where("_id").equals("64e5fa216106d6bb5c0ca2cb");
    //    const user = await User.find().findName("ansari");

    mongoClient = mongoose.connect(
      "mongodb+srv://sp19bscs0038:ansari123@cluster0.mgcjt2g.mongodb.net/practice-db"
    );
    const user = await User.findOne({ email: "Sally@kyle.com" });

    // user.sayHi();
    // user.findByName();
    // user.bestFriend = "64e5fe2bd9e894078e2a33a5";
    // await user.save();
    // .select("name")
    // .populate("bestFriend")

    // const user = await new User({
    //   name: "Salman",
    //   age: 25,
    //   email: "Sally@kyle.com",
    //   hobbies: ["gym", "cricket"],
    //   address: { city: "karachi" },
    // });

    // await user.save();
    // user[0].bestFriend = "64e5fe2bd9e894078e2a33a5";
    // await user[0].save;
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
}

// console.log("Hi");
