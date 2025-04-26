
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="font-heading font-bold text-xl">Greenify</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Connecting farmers and consumers for fresher produce, sustainable living, and supporting local agriculture.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/farmers" className="text-gray-300 hover:text-white transition-colors">Our Farmers</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/shop/vegetables" className="text-gray-300 hover:text-white transition-colors">Vegetables</Link></li>
              <li><Link to="/shop/fruits" className="text-gray-300 hover:text-white transition-colors">Fruits</Link></li>
              <li><Link to="/shop/dairy" className="text-gray-300 hover:text-white transition-colors">Dairy</Link></li>
              <li><Link to="/shop/herbs" className="text-gray-300 hover:text-white transition-colors">Herbs</Link></li>
              <li><Link to="/shop/organic" className="text-gray-300 hover:text-white transition-colors">Organic Products</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>1234 Green Valley Road</p>
              <p>Farmington, CA 92345</p>
              <p>Email: <a href="mailto:hello@greenify.com" className="hover:text-white transition-colors">hello@greenify.com</a></p>
              <p>Phone: <a href="tel:+11234567890" className="hover:text-white transition-colors">(123) 456-7890</a></p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-green-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Greenify. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
