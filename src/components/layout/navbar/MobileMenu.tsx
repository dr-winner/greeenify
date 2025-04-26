
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: {
    name: string;
    href: string;
  }[];
}

const MobileMenu = ({ isOpen, onClose, navLinks }: MobileMenuProps) => {
  const { isAuthenticated, userName, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };
  
  return (
    <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Mobile menu header and top section */}
      <div className="p-4 flex items-center justify-between border-b">
        <span className="font-bold text-lg">Menu</span>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
          <X className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile navigation links */}
      <div className="mt-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="block px-4 py-3 text-lg hover:bg-green-50 hover:text-green-600 transition-colors"
            onClick={onClose}
          >
            {link.name}
          </Link>
        ))}
      </div>
      
      {/* User menu and bottom section */}
      <div className="p-4 mt-auto border-t">
        {isAuthenticated ? (
          <div className="space-y-2">
            <p className="text-gray-700">Logged in as: {userName}</p>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-lg hover:bg-gray-100 hover:text-red-600 transition-colors">
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link to="/login" className="block px-4 py-3 text-lg hover:bg-gray-100 hover:text-green-600 transition-colors" onClick={onClose}>
              Login
            </Link>
            <Link to="/register" className="block px-4 py-3 text-lg hover:bg-gray-100 hover:text-green-600 transition-colors" onClick={onClose}>
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
