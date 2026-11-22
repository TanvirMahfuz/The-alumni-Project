import "dotenv/config";
import http from "http";
import app from "./app/app.js";
import { connectDB } from "./app/config/db.js";
import { initSocket } from "./app/sockets/socket.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);
    initSocket(server);

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
