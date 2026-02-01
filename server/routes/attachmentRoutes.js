const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../config/upload");
const {
  uploadAttachment,
  getGroupAttachments,
} = require("../controllers/attachmentController");

router.post("/", protect, upload.single("file"), uploadAttachment);
router.get("/:groupId", protect, getGroupAttachments);

module.exports = router;
