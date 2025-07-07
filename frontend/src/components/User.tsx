import React from 'react';
import { useQuery } from '@apollo/client';
import { Modal, Spinner } from 'react-bootstrap';
import { GET_CLIENTS } from '../graphqlClient/queries';

export default function User() {
  const { data: clientdata, loading: clientloading, error } = useQuery(GET_CLIENTS);

  const handleLogout = async (): Promise<void> => {
    try {
      window.location.href = 'http://localhost:3700/auth/logout';
    } catch (err: any) {
      console.error(err);
    }
  };

  if (clientloading) {
    return (
      <Modal show centered backdrop="static" keyboard={false}>
        <Modal.Body
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            padding: '2rem',
            fontFamily: 'Segoe UI, Roboto, sans-serif',
            fontSize: '1.1rem',
            textAlign: 'center',
            minHeight: '200px',
          }}
        >
          <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          <div className="mt-4" style={{ fontWeight: '500', color: '#333' }}>
            Loading Clients, please wait...
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  const users = clientdata?.clients ?? [];

  return (
    <div className="App">
      <h1>Users List</h1>
      <button onClick={handleLogout}>Logout</button>
          <ul>
              {console.log(clientdata?.clients)}
        {clientdata && clientdata.clients ? (
          clientdata.clients.map((user: any, index: number) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: 20,
                justifyContent: 'space-between',
                width: 'max-content',
              }}
            >
                  <li>{user?.username}</li>
                  <img src={user.image} alt='Profile' width={100} height={100}/>
            </div>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
}
