"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTask: (text: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Laden uit localStorage
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // Opslaan in localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = (text: string) => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTask, toggleTask, deleteTask }}>
      {children}
    </TodoContext.Provider>
  );
};

// Hook voor gebruik in componenten
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("er gaat iets mis met de context");
  return context;
};
