import { Server } from "socket.io";
import http from "http";
import app from "../app.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

const userSocketMap = {};
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}


try {
  io.on("connection", (socket) => {
    const socketId = socket.id;
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log(userSocketMap);
    }

    socket.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      delete userSocketMap[userId]; 
      console.log("user disconnected", socketId);
    });

  });
} catch (error) {
  console.log(error);
} 

export { server, io };
