// import React, { useEffect, useState } from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';

// export default function ProtectedRoute() {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null: loading, true/false: result
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const location = useLocation();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await fetch('http://localhost:3700/auth/isAuthenticated', {
//           credentials: 'include',
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         const data = await response.json();

//         if (!response.ok || !data.user) {
//           throw new Error(data.error || 'Unauthorized');
//         }

//         setCurrentUser(data.user);
//         setIsAuthenticated(true);
//       } catch (err) {
//         console.error('Auth check failed:', err);
//         setIsAuthenticated(false);
//         setCurrentUser(null);
//         localStorage.removeItem('entry');
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // You can replace this with a Spinner component
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ path: location.pathname }} replace />;
//   }

//   return <Outlet context={currentUser} />;
// }


import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AUTH } from '../graphqlClient/queries';
import { useQuery } from '@apollo/client';
import { Modal, Spinner } from 'react-bootstrap';

export default function ProtectedRoute() {
  const location = useLocation();
  const { loading, error, data } = useQuery(AUTH);

  if (loading) {
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
            Authenticating, please wait...
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  if (error || !data) {
    return <Navigate to="/login" state={{ path: location.pathname }} replace />;
  }

  return <Outlet context={data?.auth} />;
}