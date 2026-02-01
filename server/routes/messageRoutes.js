const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getGroupMessages } = require("../controllers/messageController");

router.get("/:groupId", protect, getGroupMessages);

module.exports = router;
