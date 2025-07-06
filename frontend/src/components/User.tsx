import React, { useState, useEffect } from 'react'
// import { redirect } from 'react-router-dom';

export default function User() {
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

    const handlelogout = async(): Promise<any> => {
        try {
            window.location.href = 'http://localhost:3700/auth/logout'
        } catch (err: any) {
            console.error(err)
        }
    }
  
    return (
      <div className="App">
            <h1>Users List</h1>
            <button onClick={handlelogout}>Logout</button>
        <ul>
          {users.length > 0 ? (
            users.map((user: any, index: number) => (
              <div style={{display: 'flex', gap: 20, justifyContent: 'space-between', width: 'max-content'}} className=''>
                <li key={index}>{user?.firstName}</li>
                {/* <li key={index}>{user?.lastName}</li> */}
              </div>
              
            ))
          ) : (
            <li>No users found.</li>
          )}
        </ul>
      </div>
    );
}
