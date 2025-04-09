const express = require("express");
const clientAuth = require("../middleware/auth");
const Task = require("../models/task");

const taskRouter = express.Router();

// create new task

taskRouter.post("/task/create", clientAuth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const client = req.client;

    const task = new Task({
      title,
      description,
      clientId: client._id,
    });

    await task.save();
    res.status(200).json({
      msg: "task added successfully",
      data: task,
    });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

// getting all the task of loggedIn cient/user

taskRouter.get("/tasks", clientAuth, async (req, res) => {
  try {
    const loggedInClient = req.client;

    const allTasks = await Task.find({ clientId: loggedInClient._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      msg: "all tasks of loggedIn client",
      data: allTasks,
    });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

// update the title, status or description
taskRouter.patch("/task/update/:id", clientAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      msg: "Task updated successfully",
      data: updatedTask,
    });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

// deleting a task

taskRouter.delete("/delete/task/:id", clientAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    res.status(200).json({
      msg: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

module.exports = taskRouter;
