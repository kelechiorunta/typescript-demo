import React from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { FaPen, FaTimes } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useLazyQuery } from '@apollo/client';
import { UPDATE_PROFILE, GET_PROFILE } from '../graphqlClient/queries';
import { AuthContextType } from './VisitorClient';

interface EditProfileModalProps {
  show: boolean;
  handleClose: () => void;
  currentUser: AuthContextType;
  handleSave: (user: AuthContextType) => void;
}

const FaPenIcon = FaPen as unknown as any//React.FC<React.SVGProps<SVGSVGElement>>;
const FaTimesIcon = FaTimes as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  show,
  handleClose,
  currentUser,
  handleSave,
}) => {
    const [updateProfile] = useMutation(UPDATE_PROFILE);
    const [fetchProfile] = useLazyQuery(GET_PROFILE); // 👈 new line

  const formik = useFormik({
    initialValues: {
      username: currentUser.username || '',
      picture: currentUser.picture || '',
      birthday: currentUser.birthday || '',
      occupation: currentUser.occupation || '',
      gender: currentUser.gender || '',
      phone: currentUser.phone || '',
      address: currentUser.address || '',
      email: currentUser.email || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3).required('Username is required'),
      phone: Yup.string().matches(/^[0-9]+$/, 'Must be digits only'),
      address: Yup.string().max(100),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await updateProfile({
          variables: { userInputs: values },
        });
        handleSave(data.updateProfile);
        handleClose();
      } catch (error) {
        console.error('Update failed:', error);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue('picture', reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Modal className="modal-style" show={show} onHide={handleClose} centered>
      <Modal.Body className="p-4 position-relative">

        {/* Close Button */}
        <Button
          variant="light"
          className="position-absolute top-0 end-0 m-2"
          onClick={handleClose}
          style={{ borderRadius: '50%' }}
        >
          <FaTimesIcon />
        </Button>

        <div className="text-center position-relative">
          <Image
            src={formik.values.picture}
            roundedCircle
            width={100}
            height={100}
            className="object-fit-cover border border-2"
          />
          <Form.Label
            htmlFor="avatarUpload"
            className="position-absolute"
            style={{
              right: '40%',
              bottom: '50px',
              backgroundColor: '#fff',
              borderRadius: '50%',
              padding: '6px',
              cursor: 'pointer',
              border: '1px solid #ccc',
            }}
          >
            <FaPenIcon size={20} />
          </Form.Label>
          <Form.Control
            type="file"
            id="avatarUpload"
            className="d-none"
            onChange={handleFileChange}
          />
          <div className="mt-2 fw-bold">{formik.values.username}</div>
          <div className="text-muted">{formik.values.email}</div>
        </div>

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.username && formik.touched.username}
              placeholder="Enter your name"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Occupation</Form.Label>
            <Form.Control
              type="text"
              name="occupation"
              value={formik.values.occupation}
              onChange={formik.handleChange}
              placeholder="Enter occupation"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  placeholder="e.g. Male/Female/Other"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  placeholder="Add number"
                  isInvalid={!!formik.errors.phone && formik.touched.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              placeholder="Enter address"
            />
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: '#a303a0', borderColor: '#a303a0' }}
            >
              Save Change
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfileModal;
