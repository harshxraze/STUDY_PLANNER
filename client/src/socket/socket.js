import { io } from "socket.io-client";

// Use the Environment Variable we set earlier
// If VITE_API_URL is missing (local dev), fall back to localhost
const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const socket = io(URL, {
  autoConnect: false,
  withCredentials: true, // Important for cookies/session stability
});

export default socket;