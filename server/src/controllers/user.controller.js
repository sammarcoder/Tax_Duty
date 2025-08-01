const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

// exports.createUser = async (req, res) => {
//   const { name, email } = req.body;
//   const user = await User.create({ name, email });
//   res.status(201).json(user);
// };








exports.createUser = async (req, res) => {
  try {
    console.log("📥 Incoming Request Body:", req.body); // log input

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Missing name or email" });
    }

    const newUser = await User.create({ name, email });

    console.log("✅ User Created:", newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("❌ Error in createUser:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};