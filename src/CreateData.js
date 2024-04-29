import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

const todoList = [
  { id: 1, type: 'Fruit', name: 'Apple' },
  { id: 2, type: 'Vegetable', name: 'Broccoli' },
  { id: 3, type: 'Vegetable', name: 'Mushroom' },
  { id: 4, type: 'Fruit', name: 'Banana' },
  { id: 5, type: 'Vegetable', name: 'Tomato' },
  { id: 6, type: 'Fruit', name: 'Orange' },
  { id: 7, type: 'Fruit', name: 'Mango' },
  { id: 8, type: 'Fruit', name: 'Pineapple' },
  { id: 9, type: 'Vegetable', name: 'Cucumber' },
  { id: 10, type: 'Fruit', name: 'Watermelon' },
  { id: 11, type: 'Vegetable', name: 'Carrot' },
];

function App() {
  const [mainTodos, setMainTodos] = useState(todoList);
  const [fruitTodos, setFruitTodos] = useState([]);
  const [vegetableTodos, setVegetableTodos] = useState([]);

  const handleItemClick = (todo) => {
    setMainTodos(prevTodos => prevTodos.filter(item => item.id !== todo.id));

    if (todo.type === 'Fruit') {
      setFruitTodos(prevTodos => [...prevTodos, todo]);
      setTimeout(() => {
        setMainTodos(prevMainTodos => [todo, ...prevMainTodos]);
        setFruitTodos(prevFruitTodos => prevFruitTodos.filter(item => item.id !== todo.id));
      }, 5000);
    } else if (todo.type === 'Vegetable') {
      setVegetableTodos(prevTodos => [...prevTodos, todo]);
      setTimeout(() => {
        setMainTodos(prevMainTodos => [todo, ...prevMainTodos]);
        setVegetableTodos(prevVegetableTodos => prevVegetableTodos.filter(item => item.id !== todo.id));
      }, 5000);
    }
  };

  return (
    <div className="container">
      <div className="column">
        <h2>2</h2>
        {mainTodos.map((todo, index) => (
          <button key={todo.id} onClick={() => handleItemClick(todo)}>{todo.name}</button>
        ))}
      </div>
      <div className="column">
        <h2>Fruit</h2>
        {fruitTodos.map(todo => (
          <button key={todo.id}>{todo.name}</button>
        ))}
      </div>
      <div className="column">
        <h2>Vegetable</h2>
        {vegetableTodos.map(todo => (
          <button key={todo.id}>{todo.name}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
