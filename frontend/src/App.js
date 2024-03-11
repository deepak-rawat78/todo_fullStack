import "./App.css";
import { useEffect, useState } from "react";
import { getTodoItemsList, saveTodoItem } from "./helper";

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

  const renderItem = (value) => {
    return <li>{value}</li>;
  };

  return (
    <div>
      <input type="text" value={todoText} onChange={handleChangeText} />
      <button type="button" title="Add" onClick={addTodoItem}>
        Add
      </button>
      <ul>{data.map(renderItem)}</ul>
    </div>
  );
}

export default App;
