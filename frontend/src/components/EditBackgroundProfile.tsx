// // components/EditBackgroundProfile.tsx
// import React, { useState } from 'react';
// import { Modal, Button, Form, Spinner } from 'react-bootstrap';
// import { useMutation } from '@apollo/client';
// import { SET_PROFILE_BACKGROUND } from '../graphqlClient/queries';
// import { AuthContextType } from './VisitorClient';

// interface EditBackgroundProfileProps {
//   show: boolean;
//   handleClose: () => void;
//   currentUser: AuthContextType;
//   setCurrentUser: React.Dispatch<React.SetStateAction<AuthContextType>>;
// }

// // ✅ Convert file to base64 string
// const convertToBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file); // Reads file and returns base64 string
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });
// };

// const EditBackgroundProfile: React.FC<EditBackgroundProfileProps> = ({ show, handleClose, currentUser, setCurrentUser }) => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [updateBackground] = useMutation(SET_PROFILE_BACKGROUND, {
//     onCompleted: (data) => {
//       if (data?.updateProfileBackground?.backgroundImage) {
//         setCurrentUser(prev => ({
//           ...prev,
//           backgroundImage: data.updateProfileBackground.backgroundImage
//         }));
//       }
//       setUploading(false);
//       handleClose();
//     },
//     onError: () => {
//       setUploading(false);
//       setError('Failed to update profile background.');
//     }
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//       setError(null);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedFile) {
//       setError('Please select an image file.');
//       return;
//     }

//     try {
//       setUploading(true);
//       const base64String = await convertToBase64(selectedFile);
//       await updateBackground({
//         variables: {
//           username: currentUser.username,
//           backgroundImage: base64String,
//         }
//       });
//     } catch (err) {
//       console.error(err);
//       setError('Image upload failed.');
//       setUploading(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Cover Photo</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formFile">
//             <Form.Label>Select a background image</Form.Label>
//             <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
//           </Form.Group>
//           {error && <p className="text-danger mt-2">{error}</p>}
//           <Button className="mt-3" type="submit" variant="primary" disabled={uploading}>
//             {uploading ? <><Spinner size="sm" animation="border" /> Uploading...</> : 'Save'}
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default EditBackgroundProfile;


// EditBackgroundProfile.tsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useMutation, useLazyQuery, gql } from '@apollo/client';

import { AuthContextType } from './VisitorClient';
import { GET_BACKGROUND_IDS } from '../graphqlClient/queries';

const SET_BACKGROUND_IMAGE = gql`
  mutation SetBackgroundImage($email: String!) {
    setBackgroundImage(email: $email) {
      backgroundImage
      backgroundPlaceholder
      backgroundImageId
      backgroundPlaceholderId
      id
    }
  }
`;
interface Props {
  show: boolean;
  handleClose: () => void;
  currentUser: any;
  storedUser: AuthContextType;
  setCurrentUser: (user: any) => void;
}

const EditBackgroundProfile: React.FC<Props> = ({ show, handleClose, storedUser, currentUser, setCurrentUser }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
    const [setBackgroundImage] = useMutation(SET_BACKGROUND_IMAGE);
    
const [getBackgroundImageIds] = useLazyQuery(GET_BACKGROUND_IDS);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !currentUser?.email) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('picture', file);

    try {
      // Upload image to REST endpoint
      await fetch(`http://localhost:3700/pic/background/${currentUser.email}`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      // Then trigger the GraphQL mutation to get image URLs
      const { data } = await setBackgroundImage({ variables: { email: storedUser.email } });

      if (data?.setBackgroundImage) {
        setCurrentUser((prev: any) => ({
          ...prev,
            backgroundImage: data.setBackgroundImage.backgroundImage,
            backgroundPlaceholder: data.setBackgroundImage.backgroundPlaceholder,
            backgroundImageId: data.setBackgroundImage.id,
            backgroundPlaceholderId: data.setBackgroundImage.id,
        }));
        handleClose();
      }
      const { data: idData } = await getBackgroundImageIds({ variables: { email: storedUser.email } });

      if (idData?.getBackgroundImageIds) {
        setCurrentUser((prev: any) => ({
          ...prev,
          backgroundImage: `http://localhost:3700/pic/images/${idData.getBackgroundImageIds.backgroundImageId}`,
          backgroundPlaceholder: `http://localhost:3700/pic/images/${idData.getBackgroundImageIds.backgroundPlaceholderId}`,
          backgroundImageId: idData.getBackgroundImageIds.backgroundImageId,
          backgroundPlaceholderId: idData.getBackgroundImageIds.backgroundPlaceholderId,
        }));
      }
    } catch (err) {
      console.error('Error uploading background image:', err);
    } finally {
      setUploading(false);
    }
  };
    
    

  return (
    <Modal className='modal-style' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title >Edit Cover Photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Select Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpload} disabled={!file || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBackgroundProfile;

