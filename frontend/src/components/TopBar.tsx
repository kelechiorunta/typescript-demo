import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_FILTERED_CLIENT } from '../graphqlClient/queries';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Card, Image, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { AuthContextType } from './VisitorClient';

interface UserContextProps {
  authUser: AuthContextType;
}
interface TopBarProps {
    authUser: AuthContextType;
    currentUser: AuthContextType;
    setCurrentUser: React.Dispatch<React.SetStateAction<AuthContextType>>;
}
  
const FaSearchIcon = FaSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const TopBar: React.FC<TopBarProps> = ({ authUser, setCurrentUser, currentUser }) => {
 
  const [getFilteredClients, { data, loading, error }] = useLazyQuery(GET_FILTERED_CLIENT, {
    fetchPolicy: 'network-only',
    onCompleted: (res) => {
      if (res?.filteredClients?.length > 0) {
          setCurrentUser(res.filteredClients[0]);
        //   alert('User found');
        // } else {
        //   alert('No user found');
        
        }
    },
  });

  return (
    <Row className="mb-4 align-items-center justify-content-between">
      <Col md={6}>
        <Formik
          initialValues={{ username: '' }}
          validationSchema={Yup.object({
            username: Yup.string().min(2, 'Too Short!').required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            getFilteredClients({ variables: { client: { username: values.username } } })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting }) => (
            <FormikForm>
              <InputGroup>
                <InputGroup.Text><FaSearchIcon color="#a303a0" /></InputGroup.Text>
                <Field
                name="username"
                as={Form.Control}
                disabled={isSubmitting || loading}
                placeholder="Search..."
                style={{ color: '#a303a0' }}
                />

              </InputGroup>
              <div style={{ color: 'red', fontSize: '0.8rem' }}>
                <ErrorMessage name="username" />
              </div>
            </FormikForm>
          )}
        </Formik>
      </Col>

      <Col className="text-end d-none d-md-block">
        <span style={{ color: '#a303a0' }} className="me-3">
          {currentUser?.username}
        </span>
        <Image
          src={currentUser?.picture || './profile.png'}
          roundedCircle
          width={40}
          height={40}
        />
      </Col>
    </Row>
  );
};

export default TopBar;
