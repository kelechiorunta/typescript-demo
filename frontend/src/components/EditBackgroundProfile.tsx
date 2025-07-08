// components/EditBackgroundProfile.tsx
import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { SET_PROFILE_BACKGROUND } from '../graphqlClient/queries';
import { AuthContextType } from './VisitorClient';

interface EditBackgroundProfileProps {
  show: boolean;
  handleClose: () => void;
  currentUser: AuthContextType;
  setCurrentUser: React.Dispatch<React.SetStateAction<AuthContextType>>;
}

// ✅ Convert file to base64 string
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Reads file and returns base64 string
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const EditBackgroundProfile: React.FC<EditBackgroundProfileProps> = ({ show, handleClose, currentUser, setCurrentUser }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [updateBackground] = useMutation(SET_PROFILE_BACKGROUND, {
    onCompleted: (data) => {
      if (data?.updateProfileBackground?.backgroundImage) {
        setCurrentUser(prev => ({
          ...prev,
          backgroundImage: data.updateProfileBackground.backgroundImage
        }));
      }
      setUploading(false);
      handleClose();
    },
    onError: () => {
      setUploading(false);
      setError('Failed to update profile background.');
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select an image file.');
      return;
    }

    try {
      setUploading(true);
      const base64String = await convertToBase64(selectedFile);
      await updateBackground({
        variables: {
          username: currentUser.username,
          backgroundImage: base64String,
        }
      });
    } catch (err) {
      console.error(err);
      setError('Image upload failed.');
      setUploading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Cover Photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile">
            <Form.Label>Select a background image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
          {error && <p className="text-danger mt-2">{error}</p>}
          <Button className="mt-3" type="submit" variant="primary" disabled={uploading}>
            {uploading ? <><Spinner size="sm" animation="border" /> Uploading...</> : 'Save'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBackgroundProfile;



