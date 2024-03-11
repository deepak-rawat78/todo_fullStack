const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
// Enable CORS for all routes and origins
app.use(cors());

const PORT = 3000;
let todoList = [];

app.get("/getItems", (req, res) => {
  console.log(todoList, todoList, "todoList");
  return res.json(todoList);
});

app.post("/addTodo", (req, res) => {
  console.log(req.body, "req.data");
  todoList.push(req.body.data);
  res.json({ message: "success", data: req.body });
});

app.listen(PORT, () => {
  console.log("App is running at " + PORT);
});
