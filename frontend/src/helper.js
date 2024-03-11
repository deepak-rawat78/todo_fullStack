import axios from "axios";

export const getTodoItemsList = (data) => {
  return axios.get("http://localhost:3000/getItems", {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const saveTodoItem = (data) => {
  return axios.post("http://localhost:3000/addTodo", data);
};
