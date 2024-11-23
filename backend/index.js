import mongoose from "mongoose";
import app from "./app/app.js";

mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
