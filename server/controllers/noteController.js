const Note = require("../models/Note");

// GET ALL NOTES FOR GROUP
exports.getGroupNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      groupId: req.params.groupId,
    })
      .populate("author", "name")
      .sort({ createdAt: -1 }); // newest first

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE NEW NOTE (NO OVERWRITE)
exports.saveNote = async (req, res) => {
  try {
    const { groupId, content } = req.body;

    if (!groupId || !content) {
      return res.status(400).json({ message: "Missing data" });
    }

    const note = await Note.create({
      groupId,
      content,
      author: req.user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
