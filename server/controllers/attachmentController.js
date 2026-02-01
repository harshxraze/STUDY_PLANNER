const Attachment = require("../models/Attachment");

exports.uploadAttachment = async (req, res) => {
  try {
    const file = req.file;
    const { groupId } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const attachment = await Attachment.create({
      groupId,
      uploadedBy: req.user._id,
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    });

    res.status(201).json(attachment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGroupAttachments = async (req, res) => {
  try {
    const attachments = await Attachment.find({
      groupId: req.params.groupId,
    }).populate("uploadedBy", "name");

    res.json(attachments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
