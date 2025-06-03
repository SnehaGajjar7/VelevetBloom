import contactModel from "../model/contactModel.js";

const submitMessage = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;
    const imagePath = req.file ? req.file.path.replace("\\", "/") : null;

    const newMessage = new contactModel({
      name,
      email,
      message,
      imagePath,
      rating: parseInt(rating) || 0, // Convert to number and fallback to 0
    });

    await newMessage.save();
    res.status(200).json({ message: "Message received" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await contactModel.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export { submitMessage, getMessages };
