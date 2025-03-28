import { Server } from "socket.io";
import http from "http";
import app from "../app.js";

const userSocketMap = {};
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

try {
  io.on("connection", (socket) => {
    const socketId = socket.id;
    const userId = socket.handshake.query.userId;
    userSocketMap[userId] = socketId;

    socket.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("Updated userSocketMap (connection):", userSocketMap);


    socket.on("disconnect", () => {
      delete userSocketMap[userId]; 
      console.log("user disconnected", socketId);
    });

  });
} catch (error) {
  console.log(error);
} 

export { server, io };
