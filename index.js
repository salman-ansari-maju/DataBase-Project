const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth/auth");
const User = require("./database/User");
const connectToCluster = require("./database/dataBase");

// const post = require("./database/posts");
const connectToPosts = require("./database/postConnection");
const Posts = require("./database/posts");

const url = "mongodb+srv://sp19bscs0038:ansari123@cluster0.mgcjt2g.mongodb.net";
const dbName = "practice-db";

connectToCluster();
connectToPosts();

// app.post("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });
app.post("/tweet", async function (req, res) {
  const post = await new Posts({
    tweet: "This is salman tweet",
    userID: "64ec7ff7d82b48000140fca1",
  });

  try {
    await post.save();
    console.log("Post is saved");
    // res.status(201).json({ message: "Post is saved" });
    console.log(post);
  } catch (error) {
    console.error("Error saving post:", error);
    // res.status(500).json({ error: "Error saving post" });
  }
});
async function run() {}
run();

const secretKey = "ansari";

function generateToken(user) {
  return jwt.sign({ userId: user._id, email: user.email }, secretKey, {
    expiresIn: "2h", // Token expiration time
  });
}
app.get("/user", async function (req, res) {
  const user = await User.aggregate([
    {
      $lookup: {
        foreignField: "userID",
        localField: "_id",
        from: "posts",
        as: "posts",
      },
    },
  ]);
  res.json({ user });
});

app.post("/", async function (req, res) {
  // res.json(`reqest-Body ${JSON.stringify(req.body.param.email)}`);
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }
  try {
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordMatch) {
      const token = generateToken(user);
      user.token = token;
      // console.log(user);
      res.json({ user });
    } else {
      // Passwords do not match; authentication failed
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/signup", async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.json({ message: "User already exist" });
    return;
  }
  try {
    // Hash the password securely before saving it
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the saltRounds, you can adjust this value

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      // Add other fields as needed
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("running on port 3000"));
