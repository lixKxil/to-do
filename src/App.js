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
  const [createData, setCreateData] = useState([]);
  const [isShowButton, setIsShowButton] = useState(true);

  const handleItemClick = (todo) => {
    setMainTodos((prevTodos) =>
      prevTodos.filter((item) => item.id !== todo.id)
    );

    if (todo.type === 'Fruit') {
      setFruitTodos((prevTodos) => [...prevTodos, todo]);
      setTimeout(() => {
        setMainTodos((prevMainTodos) => {
          if (!prevMainTodos.some((item) => item.name === todo.name)) {
            const newMainTodos = [...prevMainTodos];
            newMainTodos.push(todo);
            return newMainTodos;
          } else {
            return prevMainTodos;
          }
        });
        setFruitTodos((prevFruitTodos) =>
          prevFruitTodos.filter((item) => item.id !== todo.id)
        );
      }, 5000);
    } else if (todo.type === 'Vegetable') {
      setVegetableTodos((prevTodos) => [...prevTodos, todo]);
      setTimeout(() => {
        setMainTodos((prevMainTodos) => {
          if (!prevMainTodos.some((item) => item.name === todo.name)) {
            const newMainTodos = [...prevMainTodos];
            newMainTodos.push(todo);
            return newMainTodos;
          } else {
            return prevMainTodos;
          }
        });
        setVegetableTodos((prevVegetableTodos) =>
          prevVegetableTodos.filter((item) => item.id !== todo.id)
        );
      }, 5000);
    }
  };

  const handleItemTypeClick = (todo) => {
    setMainTodos((prevTodos) =>
      prevTodos.filter((item) => item.id !== todo.id)
    );

    if (todo.type === 'Fruit') {
      setFruitTodos((prevTodos) => [...prevTodos, todo]);
      setMainTodos((prevMainTodos) => prevMainTodos.concat(todo));
      setFruitTodos((prevFruitTodos) =>
        prevFruitTodos.filter((item) => item.id !== todo.id)
      );
    } else if (todo.type === 'Vegetable') {
      setVegetableTodos((prevTodos) => [...prevTodos, todo]);
      setMainTodos((prevMainTodos) => prevMainTodos.concat(todo));
      setVegetableTodos((prevVegetableTodos) =>
        prevVegetableTodos.filter((item) => item.id !== todo.id)
      );
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const { data } = response;
      transformData(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const transformData = (data) => {
    const departmentData = {};

    data.forEach((person) => {
      const { company, gender, hair, firstName, lastName, address } = person;
      const { department } = company;

      if (!departmentData[department]) {
        departmentData[department] = {
          male: 0,
          female: 0,
          hair: {},
          addressUser: {},
        };
      }

      if (gender === 'male') {
        departmentData[department].male++;
      } else {
        departmentData[department].female++;
      }

      const hairColor = hair.color;
      if (!departmentData[department].hair[hairColor]) {
        departmentData[department].hair[hairColor] = 0;
      }
      departmentData[department].hair[hairColor]++;

      const addressKey = `${firstName}${lastName}`;
      departmentData[department].addressUser[addressKey] = address.postalCode;
    });

    const departmentStats = {};

    for (const department in departmentData) {
      const { male, female } = departmentData[department];

      const minAge = Math.min(
        ...data
          .filter((person) => person.company.department === department)
          .map((person) => person.age)
      );
      const maxAge = Math.max(
        ...data
          .filter((person) => person.company.department === department)
          .map((person) => person.age)
      );
      const ageRange = minAge === maxAge ? `${maxAge}` : `${minAge}-${maxAge}`;

      departmentStats[department] = {
        male,
        female,
        hair: departmentData[department].hair,
        addressUser: departmentData[department].addressUser,
        ageRange: ageRange,
      };
    }
    setCreateData(departmentStats);
    setIsShowButton(false);
    console.log(departmentStats);
  };

  return (
    <>
      <div className='container'>
        <div className='column'>
          {mainTodos.map((todo, index) => (
            <button key={todo.id} onClick={() => handleItemClick(todo)}>
              {todo.name}
            </button>
          ))}
        </div>
        <div className='column'>
          <div className='nameColumn'>
            <h5>Fruit</h5>
          </div>
          {fruitTodos.map((todo) => (
            <button key={todo.id} onClick={() => handleItemTypeClick(todo)}>
              {todo.name}
            </button>
          ))}
        </div>
        <div className='column'>
          <div className='nameColumn'>
            <h5>Vegetable</h5>
          </div>
          {vegetableTodos.map((todo) => (
            <button key={todo.id} onClick={() => handleItemTypeClick(todo)}>
              {todo.name}
            </button>
          ))}
        </div>
      </div>
      <div className='containerData'>
        <div>
          <div>
            {isShowButton && (
              <button onClick={() => fetchData()}>CreateData</button>
            )}
          </div>
          {Object.keys(createData).length > 0 && (
            <div>
              {Object.keys(createData).map((department) => (
                <div className='columnDepartment' key={department}>
                  <p>{department}</p>
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
                          {userName}:
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
