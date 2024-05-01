import React, { useState, useEffect } from 'react';

async function fetchTodoData(userID) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userID}`);
  const data = await response.json();
  return data;
}

export default function TodoApp() {
  const [userId, setUserId] = useState("");
  const [todoData, setTodoData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true)
      fetchTodoData(userId)
        .then((data) => setTodoData(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [userId]);


  function handleInputChange(event) {
    setUserId(event.target.value);
  }

  return (
    <div>
      <h1>Todo List App</h1>
      <input
        type="number"
        value={userId} // Corrected from `user` to `userId`
        onChange={handleInputChange}
        placeholder="Enter user ID"
      />
      {loading && <p>Loading...</p>}
      {todoData && (
        <ul>
          {todoData.map(todo => (
            <li key={todo.id}>
              <div>Title: {todo.title}</div>
              <div>Status: {todo.completed ? "Completed" : "Incomplete"}</div>
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
