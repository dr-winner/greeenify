
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthContext } from '@/hooks/useAuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; path: string }>;
}

const MobileMenu = ({ isOpen, onClose, navLinks }: MobileMenuProps) => {
  const { isAuthenticated, userRole, logout } = useAuthContext();

  if (!isOpen) return null;

  return (
    <div className="md:hidden pt-4 pb-3 border-t mt-3">
      <nav className="flex flex-col space-y-3">
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
            className={`px-2 py-1 font-medium ${
              location.pathname === link.path ? 'text-green-600' : 'text-gray-700'
            }`}
            onClick={onClose}
          >
            {link.name}
          </Link>
        ))}
        <div className="flex flex-col space-y-2 pt-2 border-t">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="px-2 py-1" onClick={onClose}>
                Dashboard
              </Link>
              <Link to="/orders" className="px-2 py-1" onClick={onClose}>
                My Orders
              </Link>
              {userRole === 'farmer' && (
                <Link to="/my-products" className="px-2 py-1" onClick={onClose}>
                  My Products
                </Link>
              )}
              <button 
                onClick={() => {
                  logout();
                  onClose();
                }} 
                className="px-2 py-1 text-left text-red-600 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-2 py-1" onClick={onClose}>
                Sign In
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
