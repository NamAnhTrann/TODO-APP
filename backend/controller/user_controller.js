const User = require("../model/user_model");

module.exports = {
  addUserApi: async function (req, res) {
    try {
      const newUser = new User(req.body);
      await newUser.save();

      res.status(200).json({
        user_id: newUser._id,
      });
    } catch (err) {
      console.log("err adding user");
      res.status(500).json({ message: err.message });
    }
  },

  getUserWithTasksApi: async function (req, res) {
    try {
      const { user_id } = req.params;

      const user = await User.findById(user_id).populate("tasks");

      res.status(200).json(user);
    } catch (err) {
      console.error("Error fetching user with tasks:", err.message);
      res.status(500).json({ message: "Error fetching user with tasks" });
    }
  },
};
