import axios from "axios";
import React, { useEffect, useState } from "react";

function TodoTry() {
  const [todos, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [enabledId, setEnabledId] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    async function getTodos() {
      await axios.get("http://localhost:8080/api/v1/todos").then((res) => {
        console.log(res);
        setTodo(res.data.data);
      });
    }
    getTodos();
  }, [refetch]);

  const updateTodo = async (id, newtitle, newdescription) => {
    setEnabledId(id);
    setTitle(newtitle);
    setDescription(newdescription);
  };

  const submitUpdate = async (id, title, description) => {
    await axios
      .patch(`http://localhost:8080/api/v1/todos/${id}`, {
        title,
        description,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setEnabledId("");
    setRefetch((prev) => !prev);
  };

  return (
    <div className="bg-green-200">
      <h1 className="text-4xl">Todo Try</h1>
      {/* <input type="text" /> */}
      {todos.map((todo) => (
        <div key={todo._id}>
          <input
            type="text"
            value={enabledId !== todo._id ? todo.title : title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={enabledId !== todo._id}
          />
          <br />
          <input
            type="text"
            value={enabledId !== todo._id ? todo.description : description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={enabledId !== todo._id}
          />
          <br />
          <button
            className="bg-gray-400 p-3 m-3"
            type="submit"
            onClick={() => updateTodo(todo._id, todo.title, todo.description)}>
            Update
          </button>
          <button
            className="bg-gray-400 p-3 m-3"
            onClick={() => submitUpdate(todo._id, title, description)}>
            Submit
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoTry;
