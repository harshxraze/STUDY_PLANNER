const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attachment", attachmentSchema);
