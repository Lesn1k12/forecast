import React, { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  const [editedTodo, setEditedTask] = useState(task.task);
  const [error, setError] = useState("");

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (editedTodo.trim() === "") {
      setError("Поле не може бути пустим!");
      return;
    }

    editTodo(editedTodo, task.id);
    setError("");
  };

  return (
    <form className={`EditTodoForm ${error ? 'error' : ''}`} onSubmit={handleEditSubmit}>
      <input
        type="text"
        className={`todo-input ${error ? 'error' : ''}`}
        value={editedTodo}
        onChange={(e) => {
          setEditedTask(e.target.value);
          setError("");
        }}
      />
      <button type="submit" className="todo-btn">
        Зберегти
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};
