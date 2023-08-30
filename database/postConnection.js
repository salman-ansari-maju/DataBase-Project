const mongoose = require("mongoose");
const post = require("./posts");

async function connectToPosts() {
  let mongoClient;

  try {
    mongoClient = mongoose.createConnection(
      "mongodb+srv://sp19bscs0038:ansari123@cluster0.mgcjt2g.mongodb.net/practice-db"
    );
    console.log("Successfully connected to Posts-collection");

    return mongoClient;
  } catch (error) {
    console.error("Connection to Posts-collection failed!", error);
    process.exit();
  }
}

module.exports = connectToPosts;
