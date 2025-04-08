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

module.exports = taskRouter;
