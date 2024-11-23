let mongoose = require("mongoose");

let taskSchema = mongoose.Schema({
  task_name: {
    type: String,
    required: true,
  },

  task_title: {
    type: String,
    required: true,
  },

  task_priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  task_status: {
    type: String,
    enum: ["pending", "completed", "in progress"],
  },

  task_createdAt: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (val) {
        return val <= new Date();
      },
      message: "Created data cannot be in the future",
    },
  },

  task_description: {
    type: String,
    required: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
