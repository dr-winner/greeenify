
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  name: string;
  href: string;
}

interface NavLinksProps {
  links: NavLink[];
}

const NavLinks = ({ links }: NavLinksProps) => {
  const location = useLocation();
  
  const isActive = (href: string) => {
    return location.pathname === href;
  };
  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((link) => (
        <Link 
          key={link.href} 
          to={link.href}
          className={`font-medium transition-colors hover:text-green-600 ${
            isActive(link.href) ? 'text-green-600' : 'text-gray-700'
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
