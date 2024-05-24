import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

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

// Use Routes
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome!!");
});
