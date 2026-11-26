import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const allowedOrigins = [
  "http://localhost:5173",
  "https://the-alumni-project-vrtg.vercel.app",
];
const previewOrigin = /^https:\/\/the-alumni-project-[\w-]+\.vercel\.app$/;

const isAllowedOrigin = (origin) =>
  !origin || allowedOrigins.includes(origin) || previewOrigin.test(origin);

const readCookie = (cookieHeader, name) => {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
};

// userId -> number of open sockets (a user can have several tabs open)
const onlineUsers = new Map();

let io;

const userRoom = (userId) => `user:${userId}`;

export function getReceiverSocketId(userId) {
  // Kept for existing callers: returns the room for that user if they're online
  return onlineUsers.has(String(userId)) ? userRoom(userId) : undefined;
}

const broadcastOnlineUsers = () => {
  io.emit("getOnlineUsers", [...onlineUsers.keys()]);
};

export function initSocket(server) {
  io = new Server(server, {
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

  // Identify the user from the auth cookie, never from client-supplied query params
  io.use((socket, next) => {
    try {
      const token = readCookie(socket.handshake.headers.cookie, "token");
      if (!token) return next(new Error("Unauthorized"));
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded?._id) return next(new Error("Unauthorized"));
      socket.data.userId = String(decoded._id);
      next();
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const { userId } = socket.data;
    socket.join(userRoom(userId));
    onlineUsers.set(userId, (onlineUsers.get(userId) || 0) + 1);
    broadcastOnlineUsers();

    socket.on("disconnect", () => {
      const remaining = (onlineUsers.get(userId) || 1) - 1;
      if (remaining <= 0) onlineUsers.delete(userId);
      else onlineUsers.set(userId, remaining);
      broadcastOnlineUsers();
    });
  });

  return io;
}

export { io };
