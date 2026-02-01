const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const socketHandler = require("./sockets/socketHandler");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// 1️⃣ Connect MongoDB
connectDB();

// 2️⃣ Create HTTP server
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",                      // Keep this for local development
  "https://study-planner-1-e301.onrender.com"   // <--- YOUR RENDER FRONTEND URL
];

// 3️⃣ Attach Socket.IO
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"], // 👈 Added for stability
    credentials: true         // 👈 THIS WAS MISSING! Adding this fixes the CORS error.
  },
});

// 4️⃣ Handle all socket logic in one place
socketHandler(io);

// 5️⃣ Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});