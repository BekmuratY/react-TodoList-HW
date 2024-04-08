import React, { useState } from 'react';
import './App.css';
import todosData from './todos.json';

const TodoList = () => {
  const [todos, setTodos] = useState(todosData);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleToggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
          />
        ))}
      </ul>
    </div>
  );
};

const TodoItem = ({ index, todo, onDelete, onToggle }) => {
  return (
    <li>
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(index)} />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.todo}</span>
      <button onClick={() => onDelete(index)}>Delete</button>
    </li>
  );
};

const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddTodo({
      todo: inputValue,
      done: false
    });
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoList;
