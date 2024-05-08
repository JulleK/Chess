import mongoose from "mongoose";

const mongodbUrl = "mongodb://127.0.0.1:27017/chess";
mongoose
  .connect(mongodbUrl)
  .then(() => {
    console.log("MongoDB Connected!");
    server.listen(5000, () => {
      console.log("server running at http://localhost:5000");
    });
  })
  .catch((err) => {
    console.log("OH NO ERROR!!!!");
    console.log(err);
  });
