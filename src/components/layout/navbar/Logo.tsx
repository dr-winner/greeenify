
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="text-green-500 mr-2">
        <Leaf className="h-8 w-8 stroke-current" strokeWidth={2} />
      </div>
      <span className="font-heading font-bold text-xl text-green-500">Greenify</span>
    </Link>
  );
};

export default Logo;
