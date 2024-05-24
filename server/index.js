import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcrypt";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// allow external requests
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// parse incoming data
app.use(express.json());

const store = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  touchAfter: 24 * 60 * 60,
});

store.on("error", (e) => {
  console.log("SESSION STORE ERROR!", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
};
app.use(session(sessionConfig));

// MongoDB Connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB Connected!");
    app.listen(process.env.PORT, () => {
      console.log(`server running at http://localhost:${process.env.PORT}`);
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

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // check if username or email already taken
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    if (existingUsername) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    req.session.userId = newUser._id;
    res.status(201).json({
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    req.session.userId = user._id;
    res.json({
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.clearCookie("session");
    res.status(200).json({ msg: "Logged out successfully" });
  });
});

app.get("/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const user = await User.findById(req.session.userId);
    res.json({
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
