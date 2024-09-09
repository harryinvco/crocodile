import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { DragHandle } from "./StyledComponents";

const TodoList = ({ todos, setTodos, darkMode }) => {
  const [newTodo, setNewTodo] = useState("");

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{
      backgroundColor: darkMode ? "#1F2937" : "white",
      borderRadius: "0.5rem",
      padding: "20px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
    }}>
      <DragHandle className="drag-handle" />
      <h2 style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "10px",
      }}>Personal Todo</h2>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Add new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{
            flexGrow: 1,
            padding: "5px",
            marginRight: "10px",
            backgroundColor: darkMode ? "#374151" : "white",
            color: darkMode ? "white" : "black",
            border: "1px solid #D1D5DB",
            borderRadius: "0.25rem",
          }}
        />
        <button onClick={addTodo} style={{
          padding: "5px 10px",
          backgroundColor: "#10B981",
          color: "white",
          border: "none",
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}>
          <Plus size={16} />
        </button>
      </div>
      <div style={{ height: "200px", overflowY: "auto" }}>
        {todos.map((todo) => (
          <div key={todo.id} style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
            backgroundColor: darkMode ? "#374151" : "#F3F4F6",
            padding: "5px",
            borderRadius: "0.25rem",
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: "10px" }}
            />
            <span style={{
              flexGrow: 1,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? darkMode ? "#9CA3AF" : "#6B7280" : "inherit",
            }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#EF4444",
            }}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;