import React, { useState, useEffect } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { EditTodoForm } from "./EditTodoForm";
import authService from '../../features/auth/authService';

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const token = authService.getTokenFromLocalStorage();
                const response = await axios.get('http://127.0.0.1:8000/users/get_task/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
    
                const updatedTodos = response.data.map(todo => ({
                    id: todo.id,
                    description: todo.description,
                    complete: todo.completed,
                    task: todo.task,
                }));
    
                setTodos(updatedTodos);
            } catch (error) {
                console.error('Помилка при отриманні завдань:', error);
            }
        };
    
        fetchTodos();
    }, []);  
    

    const addTodo = async todo => {
        try {
            const token = authService.getTokenFromLocalStorage();
            const response = await axios.post('http://127.0.0.1:8000/users/post_task/', {
                description: todo,
                complete: false,
                title: 0,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const newTodo = {
                id: response.data.id,
                description: response.data.description,
                complete: response.data.completed,
            };

            setTodos([...todos, newTodo]);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const toggleComplete = async id => {
        try {
            const token = authService.getTokenFromLocalStorage();
            const currentTodo = todos.find(todo => todo.id === id);
            const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, complete: !todo.completed } : todo));

            setTodos(updatedTodos);

            await axios.post(`http://127.0.0.1:8000/users/update_task/`, {
                complete: !currentTodo.completed,
                task: currentTodo.description,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error updating todo completion status:', error);
        }
    };

    const deleteTodo = async id => {
        try {
            const token = authService.getTokenFromLocalStorage();
            await axios.post(`http://127.0.0.1:8000/users/delete_task/`, { id }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const editTodo = id => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, isEditing: true } : todo)));
    };

    const cancelEditTodo = id => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, isEditing: false } : todo)));
    };

    const editTask = async (task, id) => {
        if (task.trim() === "") {
            return;
        }

        try {
            const token = authService.getTokenFromLocalStorage();
            setTodos(
                todos.map((todo) =>
                    todo.id === id ? { ...todo, task, isEditing: false } : todo
                )
            );

            await axios.post(`http://127.0.0.1:8000/users/update_task/${id}`, {
                task,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div className="TodoWrapper">
            <h1>Tasks:</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm key={index} editTodo={editTask} task={todo} cancelEditTodo={cancelEditTodo} />
                ) : (
                    <Todo key={index} task={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                )
            ))}
        </div>
    );
};
