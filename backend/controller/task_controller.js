const Task = require("../model/task_model");
const User = require("..//model/user_model");
const mongoose = require("mongoose");

module.exports = {
  addTaskApi: async function (req, res) {
    try {
      const { user_id } = req.params; // Extract user_id from params

      // Validate user_id
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        console.log("Invalid user_id format:", user_id);
        return res.status(400).json({ message: "Invalid user_id format" });
      }

      // Create the task
      const newTask = new Task({
        ...req.body,
        user_id, // Associate the task with the user
      });
      await newTask.save();

      // Add the task to the user's tasks array
      const updatedUser = await User.findByIdAndUpdate(
        user_id,
        {
          $push: {
            tasks: {
              task_id: newTask._id,
              task_name: newTask.task_name,
              task_title: newTask.task_title,
              task_priority: newTask.task_priority,
              task_status: newTask.task_status,
              task_createdAt: newTask.task_createdAt,
            },
          },
        } // Push the new task's ID into the user's tasks array
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(201).json({ task: newTask, user: updatedUser });
    } catch (err) {
      console.error("Error adding task:", err.message);
      res.status(500).json({ message: "Error adding task" });
    }
  },

  listTaskApi: async function (req, res) {
    try {
      const tasks = await Task.find({});
      res.status(200).json(tasks);
    } catch (err) {
      console.error("Error listing tasks:", err.message);
      res.status(500).json({ message: "Error listing tasks" });
    }
  },

  //TODO
  removeTaskApi: async function (req, res) {
    try {
      let { task_id } = req.query;

      // Validate task_id
      if (!mongoose.Types.ObjectId.isValid(task_id)) {
        return res.status(400).json({ message: "Invalid task_id format" });
      }

      // Delete the task from the Task collection
      let deleteResult = await Task.deleteOne({ _id: task_id });

      // Remove the task from all users' tasks array
      const userUpdateResult = await User.updateMany(
        { "tasks.task_id": task_id }, // Match users with this task_id in their tasks array
        { $pull: { tasks: { task_id: task_id } } } // Remove the task object by task_id
      );

      // Respond with the results
      res.json({
        success: true,
        message: "Task removed successfully",
        deleteResult,
        userUpdateResult,
      });
    } catch (err) {
      console.error("Error removing task:", err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  updateTaskApi: async function (req, res) {
    try {
      const { task_id } = req.params;
      let updates = req.body;

      const updatedTask = await Task.findByIdAndUpdate(
        task_id,
        { $set: updates }, // Apply updates directly
        { new: true, runValidators: true } // Return the updated task and validate schema
      );

      if (!updatedTask) {
        res.status(404).json({ message: "error adding task" });
      }

      const userUpdateResult = await User.updateOne(
        { "tasks.task_id": task_id }, // Find the task in the user's tasks array
        {
          $set: {
            "tasks.$.task_name": updatedTask.task_name, // Update specific fields
            "tasks.$.task_title": updatedTask.task_title,
            "tasks.$.task_priority": updatedTask.task_priority,
            "tasks.$.task_status": updatedTask.task_status,
            "tasks.$.task_description": updatedTask.task_description,
          },
        }
      );

      res.status(200).json({ status: "task updated", task: updatedTask });
    } catch (err) {
      res.status(500).json({ message: err.messaeg });
    }
  },
};
