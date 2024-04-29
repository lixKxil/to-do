import React, { useState } from 'react';
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
  const [userData, setUserData] = useState([]);
  const [createData, setCreateData] = useState([]);

  const handleItemClick = (todo) => {
    setMainTodos((prevTodos) =>
      prevTodos.filter((item) => item.id !== todo.id)
    );

    if (todo.type === 'Fruit') {
      setFruitTodos((prevTodos) => [...prevTodos, todo]);
      setTimeout(() => {
        setMainTodos((prevMainTodos) => [todo, ...prevMainTodos]);
        setFruitTodos((prevFruitTodos) =>
          prevFruitTodos.filter((item) => item.id !== todo.id)
        );
      }, 5000);
    } else if (todo.type === 'Vegetable') {
      setVegetableTodos((prevTodos) => [...prevTodos, todo]);
      setTimeout(() => {
        setMainTodos((prevMainTodos) => [todo, ...prevMainTodos]);
        setVegetableTodos((prevVegetableTodos) =>
          prevVegetableTodos.filter((item) => item.id !== todo.id)
        );
      }, 5000);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const { data } = response;
      setUserData(data.users);
      transformData();
    } catch (error) {
      console.error(error);
    }
  };

  const transformData = () => {
    console.log(userData);
    const transformedData = userData.reduce((result, user) => {
      const department = user.department;

      if (!result[department]) {
        result[department] = {
          male: 0,
          female: 0,
          totalAge: 0,
          count: 0,
          hair: {},
          addressUser: {},
        };
      }

      user.gender === 'male'
        ? result[department].male++
        : result[department].female++;

      result[department].totalAge += user.age;

      result[department].count++;

      const hairColor = user.hair.color;
      if (!result[department].hair[hairColor]) {
        result[department].hair[hairColor] = 0;
      }
      result[department].hair[hairColor]++;

      const userName = `${user.firstName}${user.lastName}`;
      const postalCode = user.address.postalCode;
      result[department].addressUser[userName] = postalCode;

      return result;
    }, {});

    for (const department in transformedData) {
      const departmentData = transformedData[department];
      if (departmentData.count > 0) {
        departmentData.ageRange = `${Math.round(
          departmentData.totalAge / departmentData.count
        )}-${Math.round(
          (departmentData.totalAge + departmentData.count - 1) /
            departmentData.count
        )}`;
      }
    }
    console.log('Transformed Data:', transformedData);
    setCreateData(transformedData);
  };

  return (
    <>
      <div className='container'>
        <div className='column'>
          <h2>Main</h2>
          {mainTodos.map((todo, index) => (
            <button key={todo.id} onClick={() => handleItemClick(todo)}>
              {todo.name}
            </button>
          ))}
        </div>
        <div className='column'>
          <h2>Fruit</h2>
          {fruitTodos.map((todo) => (
            <button key={todo.id}>{todo.name}</button>
          ))}
        </div>
        <div className='column'>
          <h2>Vegetable</h2>
          {vegetableTodos.map((todo) => (
            <button key={todo.id}>{todo.name}</button>
          ))}
        </div>
      </div>
      <div className='containerData'>
        <div>
          <div>
            <button onClick={() => fetchData()}>CreateData</button>
          </div>
          {Object.keys(createData).length > 0 && (
            <div className='transformed-data'>
              {Object.keys(createData).map((department) => (
                <div key={department}>
                  <p>Male: {createData[department].male}</p>
                  <p>Female: {createData[department].female}</p>
                  <p>Age Range: {createData[department].ageRange}</p>
                  <p>Hair:</p>
                  <ul>
                    {Object.keys(createData[department].hair).map((color) => (
                      <li key={color}>
                        {color}: {createData[department].hair[color]}
                      </li>
                    ))}
                  </ul>
                  <p>Address User:</p>
                  <ul>
                    {Object.keys(createData[department].addressUser).map(
                      (userName) => (
                        <li key={userName}>
                          {userName}:{' '}
                          {createData[department].addressUser[userName]}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
