import { io } from "socket.io-client";

// ⚠️ Replace this string with your ACTUAL Backend URL from Render
// It usually looks like: https://study-planner-api.onrender.com
const BACKEND_URL = "https://study-planner-nv4b.onrender.com"; 

const socket = io(BACKEND_URL, {
  autoConnect: false,
  withCredentials: true, // Critical for keeping the connection alive
});

export default socket;