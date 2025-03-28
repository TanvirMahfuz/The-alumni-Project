import mongoose from "mongoose";
import { server } from "./app/utility/sockets.js";


mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => {
    server.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
