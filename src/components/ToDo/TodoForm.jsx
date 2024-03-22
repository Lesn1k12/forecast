import React, { useState } from "react";
import styles from "./AppTodo.module.css";

export const TodoForm = ({ addTodo }) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.trim() === "") {
      setError("Поле не може бути пустим!");
      return;
    }

    addTodo(description, title);
    setTitle("")
    setDescription("");
    setError("");
  };

  return (
    <form className={`TodoForm ${error ? 'error' : ''}`} onSubmit={handleSubmit}>
      <input
        type="text"
        className={`todo-input ${error ? 'error' : ''}`}
        value={description}
        placeholder="New tasks?"
        onChange={(e) => {
          setDescription(e.target.value);
          setError("");
        }}
      />
      <button type="submit" className={`${styles.todoBtn}`}>
        Add
      </button>
      {error && <p className={`${styles.errorMessage}`}>{error}</p>}
    </form>
  );
};