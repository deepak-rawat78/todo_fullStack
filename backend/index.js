const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const TaskModal = require("./TodoModel");

const app = express();

app.use(express.json());
// Enable CORS for all routes and origins
app.use(cors());

const PORT = 3000;

const url = `mongodb+srv://${process.env.MONDODB_USERNAME}:${process.env.MONDODB_PASSWORD}@cluster0.jity4aj.mongodb.net/todo`;

const connectMongoose = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log("Mongo Connection failed", error);
    });
};

app.get("/getItems", (req, res) => {
  TaskModal.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

app.put("/editTodo", (req, res) => {
  TaskModal.update(
    { _id: req.body.id },
    {
      text: req.body.data,
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

app.delete("/deleteTodo/:id", (req, res) => {
  TaskModal.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json({ message: "Successfully deleted", id: req.query.id });
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
});

app.post("/addTodo", (req, res) => {
  const task = new TaskModal({
    text: req.body.data,
  });
  task
    .save()
    .then((res) => {
      res.json({ message: "success", data: res });
    })
    .catch((error) => {
      res.json({
        error: error.message,
      });
    });
});

app.listen(PORT, () => {
  console.log("App is running at " + PORT);
});

connectMongoose();
