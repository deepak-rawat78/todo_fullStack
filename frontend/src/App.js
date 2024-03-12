import "./App.css";
import { useEffect, useState } from "react";
import { deleteTodoItem, getTodoItemsList, saveTodoItem } from "./helper";

function App() {
  const [todoText, setTodoText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getListItem();
  }, []);
  const handleChangeText = (event) => {
    event.preventDefault();
    setTodoText(event.target.value);
  };

  const getListItem = () => {
    getTodoItemsList()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error, "get error");
      });
  };

  const addTodoItem = (event) => {
    event.preventDefault();
    saveTodoItem({ data: todoText })
      .then((res) => {
        setTodoText("");
        getListItem();
      })
      .catch((error) => {
        console.log(error, "post todo");
      });
  };

  const handleDelete = (id) => {
    deleteTodoItem(id)
      .then((res) => {
        console.log(res);
        getListItem();
      })
      .catch((error) => {
        console.log(error, "delete error");
      });
  };

  const renderItem = (value, index) => {
    return (
      <li
        className={`todo_item ${
          data.length - 1 !== index ? "todo_item_mid" : ""
        }`}
      >
        <div className="todo_value">{value?.text}</div>
        <div className="todo_item_button">
          <button className="edit_button" type="button">
            Edit
          </button>
          <button
            className="delete_button"
            type="button"
            onClick={() => handleDelete(value._id)}
          >
            Delete
          </button>
        </div>
      </li>
    );
  };

  return (
    <div className="container">
      <div className="header_container">
        <p className="title">Todo App</p>
        <div className="input_container">
          <input
            className="todo_input"
            type="text"
            value={todoText}
            onChange={handleChangeText}
          />
          <button
            className="todo_input_addButton"
            type="button"
            title="Add"
            onClick={addTodoItem}
          >
            Add
          </button>
        </div>
      </div>

      <div className="inner_container">
        <ul className="todo_list">{data.map(renderItem)}</ul>
      </div>
    </div>
  );
}

export default App;
