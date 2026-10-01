
import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [inputText, setInputText] = useState("");

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : ["Example task"];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Save todos to Local Storage whenever todos changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleKey = (e) => {
    if (e.key === "Enter" && inputText.trim()) {
      setTodos((prev) => [...prev, inputText]);
      setInputText("");
    }
  };

  const handleDelete = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index]);
  };

  const handleSave = () => {
    if (!editText.trim()) return;

    setTodos((prev) =>
      prev.map((tdo, i) => (i === editIndex ? editText : tdo))
    );

    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="app">
      <div className="todo-wrapper">
        <div className="header">
          <p className="subtitle">Stay organized</p>

          <h1 className="title">Todo App</h1>

          <p className="description">
            Keep track of your daily tasks
          </p>
        </div>

        <div className="input-section">
          <input
            type="text"
            className="inputBox"
            placeholder="What needs to be done?"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => handleKey(e)}
          />

          <span className="enter-text">
            Press Enter ↵
          </span>
        </div>

        <div className="container">
          {todos.map((todo, index) => (
            <div className="card" key={index}>
              {editIndex === index ? (
                <>
                  <input
                    className="edit-input"
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />

                  <div className="edit-buttons">
                    <button
                      className="btn save-btn"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="todo-text">
                    {todo}
                  </h3>

                  <div className="buttons">
                    <button
                      className="btn edit-btn"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

