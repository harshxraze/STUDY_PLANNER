const Message = require("../models/Message");
const User = require("../models/User");

// Track online users
const onlineUsers = new Map(); // userId -> socketId

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    // =========================
// SEND CURRENT ONLINE USERS
// =========================
socket.on("get_online_users", () => {
  socket.emit(
    "online_users",
    Array.from(onlineUsers.keys()) // [userId, userId, ...]
  );
});


    // =========================
    // USER ONLINE
    // =========================
    socket.on("user_online", (userId) => {
      if (!userId) return;

      onlineUsers.set(userId, socket.id);
      console.log("User online:", userId);

      io.emit("user_online", userId);
    });

    // =========================
    // JOIN GROUP ROOM
    // =========================
    socket.on("join_group", ({ groupId }) => {
      if (!groupId) return;

      socket.join(groupId);
      console.log(`User ${socket.id} joined group ${groupId}`);
    });

    // =========================
    // SEND CHAT MESSAGE
    // =========================
    socket.on("send_message", async ({ groupId, userId, text }) => {
      try {
        if (!groupId || !userId || !text) return;

        const message = await Message.create({
          groupId,
          sender: userId,
          text,
        });

        const populatedMessage = await message.populate(
          "sender",
          "name"
        );

        io.to(groupId).emit("new_message", {
          _id: populatedMessage._id,
          groupId: populatedMessage.groupId,
          sender: populatedMessage.sender, // { _id, name }
          text: populatedMessage.text,
          createdAt: populatedMessage.createdAt,
        });
      } catch (error) {
        console.error("Send message error:", error.message);
      }
    });

    // =========================
    // UPDATE STUDY STATUS
    // =========================
    socket.on("update_status", async ({ userId, status }) => {
      try {
        const user = await User.findByIdAndUpdate(
          userId,
          { status },
          { new: true }
        );

        if (!user) return;

        io.emit("status_updated", {
          userId: user._id.toString(),
          status: user.status,
        });
      } catch (error) {
        console.error("Status update error:", error.message);
      }
    });

    // =========================
    // DISCONNECT
    // =========================
    socket.on("disconnect", () => {
      let disconnectedUserId = null;

      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        console.log("User offline:", disconnectedUserId);
        io.emit("user_offline", disconnectedUserId);
      }

      console.log("Socket disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;
