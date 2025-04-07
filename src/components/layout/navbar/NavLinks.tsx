
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  name: string;
  path: string;
}

interface NavLinksProps {
  links: NavLink[];
}

const NavLinks = ({ links }: NavLinksProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((link) => (
        <Link 
          key={link.path} 
          to={link.path}
          className={`font-medium transition-colors hover:text-green-600 ${
            isActive(link.path) ? 'text-green-600' : 'text-gray-700'
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
