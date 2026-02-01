const Message = require("../models/Message");

// GET messages of a group
exports.getGroupMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      groupId: req.params.groupId,
    })
      .populate("sender", "name")
      .sort({ createdAt: 1 }); // oldest → newest

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
