
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Heart } from 'lucide-react';
import { useAuthContext } from '@/hooks/useAuthContext';

// Import our extracted components
import Logo from './navbar/Logo';
import NavLinks from './navbar/NavLinks';
import UserMenu from './navbar/UserMenu';
import CartButton from './navbar/CartButton';
import MobileMenu from './navbar/MobileMenu';
import { mainNavLinks } from './navbar/navConstants';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { requireAuth } = useAuthContext();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleProtectedNavigation = (path: string) => {
    if (requireAuth()) {
      navigate(path);
    }
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          {/* Logo Component */}
          <Logo />
          
          {/* Desktop Navigation Links */}
          <NavLinks links={mainNavLinks} />
          
          {/* Desktop: Search, Wishlist, Cart, and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Wishlist"
              onClick={() => handleProtectedNavigation('/wishlist')}
            >
              <Heart className="h-5 w-5" />
            </Button>
            
            {/* Cart Button */}
            <CartButton />
            
            {/* User Menu (Login/Account) */}
            <UserMenu />
          </div>
          
          {/* Mobile: Cart and Menu Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <CartButton isMobile={true} />
            <Button onClick={toggleMenu} variant="ghost" size="icon" aria-label="Menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)}
          navLinks={mainNavLinks}
        />
      </div>
    </header>
  );
};

export default Navbar;
