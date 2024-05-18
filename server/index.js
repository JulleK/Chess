import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());

// parse incoming data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome!!");
});

app.post("/signup", (req, res) => {
  res.send("signed up successfully");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "test" && password === "test")
    res.status(200).send(username);
  else res.status(401).json("incorrect username or password");
});

const mongodbUrl = "mongodb://127.0.0.1:27017/chess";
mongoose
  .connect(mongodbUrl)
  .then(() => {
    console.log("MongoDB Connected!");
    app.listen(5000, () => {
      console.log("server running at http://localhost:5000");
    });
  })
  .catch((err) => {
    console.log("OH NO ERROR!!!!");
    console.log(err);
  });
