const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const connectToCluster = require("./dataBase");

connectToCluster();

app.post("/", function (req, res) {
  res.json(`reqest-Body ${JSON.stringify(req.body.param.email)}`);
  connectToCluster(req.body.param.email);
});

app.listen(3000, () => console.log("running on port 3000"));
