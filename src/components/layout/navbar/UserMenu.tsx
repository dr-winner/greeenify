
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuthContext } from '@/hooks/useAuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const UserMenu = () => {
  const { isAuthenticated, userName, userRole, logout } = useAuthContext();

  if (!isAuthenticated) {
    return (
      <Link to="/login">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Account">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <div className="px-2 py-1.5 text-sm font-medium text-gray-900">
          Hello, {userName || 'User'}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="cursor-pointer">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/orders" className="cursor-pointer">
            My Orders
          </Link>
        </DropdownMenuItem>
        {userRole === 'farmer' && (
          <DropdownMenuItem asChild>
            <Link to="/my-products" className="cursor-pointer">
              My Products
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
