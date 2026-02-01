const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  saveNote,
  getGroupNotes,
} = require("../controllers/noteController");

router.post("/", protect, saveNote);
router.get("/:groupId", protect, getGroupNotes);

module.exports = router;
