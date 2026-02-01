
// const express = require("express");
// const cors = require("cors");

// const authRoutes = require("./routes/authRoutes");
// const testRoutes = require("./routes/testRoutes");
// const groupRoutes = require("./routes/groupRoutes");
// const noteRoutes = require("./routes/noteRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const attachmentRoutes = require("./routes/attachmentRoutes");


// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/test", testRoutes);
// app.use("/api/groups", groupRoutes);
// app.use("/api/notes", noteRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/uploads", express.static("uploads"));
// app.use("/api/attachments", attachmentRoutes);


// app.get("/", (req, res) => {
//   res.send("Study Group API is running");
// });

// module.exports = app;


const express = require("express");
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const groupRoutes = require("./routes/groupRoutes");
const noteRoutes = require("./routes/noteRoutes");
const messageRoutes = require("./routes/messageRoutes");
const attachmentRoutes = require("./routes/attachmentRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",                       // Keep this for local development
  "https://study-planner-nv4b.onrender.com"    // <--- ADD YOUR NEW RENDER FRONTEND URL
];

// 1️⃣ Fix CORS: Allow Frontend + Credentials
app.use(cors({
  origin: allowedOrigins,
  credentials: true,               // Allow cookies & authorization headers
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// 2️⃣ Middleware to parse JSON
app.use(express.json());

// 3️⃣ Serve Static Files (Uploads)
app.use("/uploads", express.static("uploads"));

// 4️⃣ Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/attachments", attachmentRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Study Group API is running");
});

module.exports = app;