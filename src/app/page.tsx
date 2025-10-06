"use client";
import { useState, useEffect } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {

  // State voor takenlijst en nieuwe taak
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  // Taken laden
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Taken opslaan bij elke verandering
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Todo App</h1>

      {/* Inputveld + knop */}
      <div className="flex gap-2 mb-6 w-full max-w-md">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nieuwe taak..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Toevoegen
        </button>
      </div>

      {/* Takenlijst */}
      <ul className="w-full max-w-md bg-white shadow-md rounded-lg divide-y divide-gray-200">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTask(todo.id)}
                className="w-5 h-5 text-blue-500 rounded border-gray-300"
              />
              <span
                className={`ml-3 ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTask(todo.id)}
              className="px-2 py-1 text-sm text-red-500 hover:text-red-700 transition"
            >
              Verwijder
            </button>
          </li>
        ))}
        {/* Bericht als er geen taken zijn */}
        {todos.length === 0 && (
          <li className="px-4 py-3 text-gray-500 text-center">
            Geen taken, voeg er een toe!
          </li>
        )}
      </ul>
    </div>


  );
}
