import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import { dbUrl } from "./config.js";
import MongoStore from "connect-mongo";

const app = express();

// allow external requests
app.use(cors());

// parse incoming data
app.use(express.json());

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
});

store.on("error", (e) => {
  console.log("SESSION STORE ERROR!", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret: "superSecret_code_:o",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
};
app.use(session(sessionConfig));

// MongoDB Connection
mongoose
  .connect(dbUrl)
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

// Routes
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
