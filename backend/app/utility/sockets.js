import { Server } from "socket.io";
import http from "http";
import app from "../app.js";

const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://the-alumni-project-vrtg.vercel.app", // ✅ this is essential
  /^https:\/\/the-alumni-project-[\w-]+\.vercel\.app$/, // optional wildcard for preview deployments
];

const isAllowedOrigin = (origin) => {
  return (
    !origin ||
    allowedOrigins.includes(origin) ||
    /^https:\/\/the-alumni-project-[\w-]+\.vercel\.app$/.test(origin)
  );
};

const io = new Server(server, {
  cors: {
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        console.warn("Blocked by Socket.IO CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
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
