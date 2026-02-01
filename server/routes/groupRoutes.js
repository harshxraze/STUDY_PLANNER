const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createGroup,
  joinGroup,
  getMyGroups,
  getAllGroups,
  leaveGroup,
} = require("../controllers/groupController");

// ORDER MATTERS
router.post("/", protect, createGroup);
router.post("/:groupId/join", protect, joinGroup);
router.get("/my", protect, getMyGroups);
router.get("/", protect, getAllGroups);
router.post("/:groupId/leave", protect, leaveGroup);


module.exports = router;
