import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Heart, Loader2 } from 'lucide-react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useWishlist } from '@/hooks/useWishlist';

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
  const { requireAuth, isAuthenticated } = useAuthContext();
  const { items: wishlistItems, isLoading: wishlistLoading } = useWishlist();
  
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
            {/* <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button> */}
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Wishlist"
              onClick={() => handleProtectedNavigation('/wishlist')}
              className="relative"
              disabled={wishlistLoading}
            >
              {wishlistLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Heart className={`h-5 w-5 ${isAuthenticated && wishlistItems.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                  {isAuthenticated && wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
                    </span>
                  )}
                </>
              )}
            </Button>
            
            {/* Cart Button */}
            <CartButton />
            
            {/* User Menu (Login/Account) */}
            <UserMenu />
          </div>
          
          {/* Mobile: Cart and Menu Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Wishlist"
              onClick={() => handleProtectedNavigation('/wishlist')}
              className="relative"
              disabled={wishlistLoading}
            >
              {wishlistLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Heart className={`h-5 w-5 ${isAuthenticated && wishlistItems.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                  {isAuthenticated && wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
                    </span>
                  )}
                </>
              )}
            </Button>
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
