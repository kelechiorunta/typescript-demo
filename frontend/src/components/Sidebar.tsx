// components/Sidebar.tsx
import React from 'react';
import { Nav, Image } from 'react-bootstrap';
import { FaHome, FaUser, FaEnvelope, FaBox, FaImages, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';

const FaHomeIcon = FaHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUserIcon = FaUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaEnvelopeIcon = FaEnvelope as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaBoxIcon = FaBox as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaImagesIcon = FaImages as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaChartBarIcon = FaChartBar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaCogIcon = FaCog as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaSignOutIcon = FaSignOutAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

interface SideProps {
    active: boolean
}

const Sidebar: React.FC<SideProps> = ({active}) => {
    const handleLogout = async (): Promise<void> => {
        try {
          window.location.href = 'http://localhost:3700/auth/logout';
        } catch (err: any) {
          console.error(err);
        }
      };
  return (
    <Nav className="flex-column bg-[ #490057] text-white vh-100 p-3 sticky-top" style={{ minWidth: '200px', backgroundColor: ' #490057' }}>
          <h4 className="text-white mb-4" style={{ width: '100%', textAlign: 'left', paddingLeft: 20 }}><Image src={'./Logo.png'} width={50} height={50} alt='' /> 3MM</h4>
      <Nav.Link className="text-white" style={{width: '100%', display: 'flex', alignItems:'center', marginLeft: 'auto'}}><FaHomeIcon className="me-2" /> Home</Nav.Link>
      <Nav.Link className="text-warning" style={{width: '100%', display: 'flex', alignItems:'center', marginLeft: 'auto'}}><FaUserIcon className="me-2" /> Profile</Nav.Link>
      <Nav.Link className="text-white" style={{width: '100%', display: 'flex', alignItems:'center', marginLeft: 'auto'}}><FaEnvelopeIcon className="me-2" /> Messages</Nav.Link>
      <Nav.Link className="text-white" style={{width: '100%', display: 'flex', alignItems:'center', marginLeft: 'auto'}}><FaBoxIcon className="me-2" /> Purchases</Nav.Link>
      <Nav.Link className="text-white" style={{width: '100%', display: 'flex', alignItems:'center', marginLeft: 'auto'}}><FaImagesIcon className="me-2" /> Returns</Nav.Link>
      <Nav.Link className="text-white" style={{width: '100%', display: 'flex', alignItems:'center', marginLeft: 'auto'}}><FaImagesIcon className="me-2" /> Gallery</Nav.Link>
      <Nav.Link className="text-white" style={{width: '100%', display: 'flex', alignItems:'center', marginLeft: 'auto'}}><FaChartBarIcon className="me-2" /> Analytics</Nav.Link>
      <Nav.Link className="text-white" style={{width: '100%', display: 'flex', alignItems:'center', marginLeft: 'auto'}}><FaCogIcon className="me-2" /> Settings</Nav.Link>
      <Nav.Link onClick={handleLogout} className="text-white" style={{width: '100%', display: 'flex', alignItems:'center', marginLeft: 'auto'}}><FaSignOutIcon className="me-2" /> Logout</Nav.Link>
      {/* {active && <h4>Online</h4>}   */}
    </Nav>
  );
};

export default Sidebar;
