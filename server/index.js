import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome!!");
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
