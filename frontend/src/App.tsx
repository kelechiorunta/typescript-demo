import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3700/users", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        const result = await response.json();
        setUsers(result|| []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array = run once on mount

  return (
    <div className="App">
      <h1>Users List</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user: any, index: number) => (
            <div style={{display: 'flex', gap: 20, justifyContent: 'space-between', width: 'max-content'}} className=''>
              <li key={index}>{user?.firstName}</li>
              <li key={index}>{user?.lastName}</li>
            </div>
            
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
