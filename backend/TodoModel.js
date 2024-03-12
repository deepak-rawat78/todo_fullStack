const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  { text: { type: String } },
  { timestamps: true }
);

const TaskModal = new mongoose.model("Task", TaskSchema);
module.exports = TaskModal;
