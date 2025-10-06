"use client";
import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  // State voor takenlijst en nieuwe taak
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  // Taak toevoegen
  const addTask = () => {
    if (!newTask.trim()) return; // voorkomt lege taken
    const newTodo: Todo = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTask("");
  };

  // Taak afvinken
  const toggleTask = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Taak verwijderen
  const deleteTask = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo App</h1>

      {/* Inputveld + knop */}
      <div className="">

        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nieuwe taak..."
        />
        <button onClick={addTask}>Toevoegen</button>
      </div>

      {/* Takenlijst */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTask(todo.id)}
            />
            <span
              className={`ml-2 mr-2 ${todo.completed ? "line-through text-gray-400" : ""}`}
            >
              {todo.text}
            </span>

            <button onClick={() => deleteTask(todo.id)}>Verwijder</button>
          </li>
        ))}
      </ul>
    </div>

    
  );
}
