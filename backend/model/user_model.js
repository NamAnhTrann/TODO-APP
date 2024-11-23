let mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
  // user_firebaseUID: {
  //   type: String,
  //   required: false,
  //   unique: true,
  // },

  user_first_name: {
    type: String,
    required: true,
  },
  user_last_name: {
    type: String,
    required: true,
  },
  user_createdAt: {
    type: Date,
    default: Date.now,
  },

  tasks: [
    {
      task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task", // Reference the Task model
        required: true,
      },
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
        required: true,
      },
      task_createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
