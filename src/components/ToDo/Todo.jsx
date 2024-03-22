import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from './AppToDo.module.css'  

export const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  console.log(task);

  return (
    <div className={`${styles.ToDo}`}>
      <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? "completed" : ""}`}>
        {task.description}
      </p>
      <div>
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};