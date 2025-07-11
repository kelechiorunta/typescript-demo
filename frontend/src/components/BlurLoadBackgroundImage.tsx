// import React, { useEffect, useState } from 'react';
// import { Card } from 'react-bootstrap';

// interface BlurLoadBackgroundImageProps {
//   fullImageId?: string | null;
//   placeholderImageId?: string | null;
//   fallbackImage?: string;
// }

// const BlurLoadBackgroundImage: React.FC<BlurLoadBackgroundImageProps> = ({
//   fullImageId,
//   placeholderImageId,
//   fallbackImage = '/suit.png',
// }) => {
//   const [loaded, setLoaded] = useState(false);
//   const [fullSrc, setFullSrc] = useState('');
//   const [placeholderSrc, setPlaceholderSrc] = useState('');

//   useEffect(() => {
//     if (placeholderImageId) {
//       setPlaceholderSrc(`http://localhost:3700/pic/images/${placeholderImageId}`);
//     }
//     if (fullImageId) {
//       setFullSrc(`http://localhost:3700/pic/images/${fullImageId}`);
//     }
//   }, [fullImageId, placeholderImageId]);

//   return (
//     <div style={{ position: 'relative', minHeight: '40vh', maxHeight: '50vh' }}>
//       {/* Placeholder blurred image */}
//       <Card.Img
//         src={placeholderSrc || fallbackImage}
//         style={{
//           filter: 'blur(20px)',
//           transform: 'scale(1.05)',
//           transition: 'opacity 0.5s ease-out',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           opacity: loaded ? 0 : 1,
//         }}
//       />

//       {/* Full high-res image */}
//       <Card.Img
//         src={fullSrc || fallbackImage}
//         onLoad={() => setLoaded(true)}
//         style={{
//           transition: 'opacity 0.5s ease-in',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           opacity: loaded ? 1 : 0,
//         }}
//       />
//     </div>
//   );
// };

// export default BlurLoadBackgroundImage;

import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Placeholder } from 'react-bootstrap';

interface BlurLoadBackgroundImageProps {
  fullImageUrl?: string | null;
  placeholderImageUrl?: string | null;
  fallbackImage?: string;
}

const BlurLoadBackgroundImage: React.FC<BlurLoadBackgroundImageProps> = ({
  fullImageUrl,
  placeholderImageUrl,
  fallbackImage = '/suit.png',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [fullSrc, setFullSrc] = useState('');
  const [placeholderSrc, setPlaceholderSrc] = useState('');

  useEffect(() => {
    setLoaded(false); // Reset loading state when the image URL changes
  }, [fullImageUrl]);


  useEffect(() => {
    if (placeholderImageUrl) {
      setPlaceholderSrc(placeholderImageUrl);
    }
    if (fullImageUrl) {
      setFullSrc(fullImageUrl);
    }
  }, [fullImageUrl, placeholderImageUrl]);

  return (
    <div style={{ position: 'relative', minHeight: '40vh', maxHeight: '64vh', width: '100%' }}>
      {/* Skeleton Loader using Bootstrap Placeholder */}
      {!loaded && (
        <Placeholder
          as="div"
          animation="wave"
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            backgroundColor: '#e0e0e0',
          }}
        />
      )}
      {/* Placeholder */}
      <Card.Img
        // className={`absolute top-0 left-0 w-full h-full object-cover filter blur-lg scale-105 transition-opacity duration-300 ${
        //   loaded ? 'opacity-0' : 'opacity-100'
        // }`}
        src={placeholderSrc || fallbackImage}
        style={{
          filter: 'blur(20px)',
          transform: 'scale(1)',
          transition: 'opacity 0.5s ease-out',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 0 : 1,
        }}
      />
      {/* Full image */}
      <Card.Img
        src={fullSrc || fallbackImage}
        // onLoad={() => setLoaded(true)}
        style={{
          transition: 'opacity 0.5s ease-in',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
        }}
        // className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default BlurLoadBackgroundImage;
