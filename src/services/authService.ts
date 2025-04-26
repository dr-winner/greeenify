
import { NavigateFunction } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { UserRole } from "@/types/user";

export interface AuthState {
  isAuthenticated: boolean;
  userName: string | null;
  userRole: string | null;
}

export const authService = {
  getAuthStatus: (): AuthState => {
    const token = localStorage.getItem('auth_token');
    const userName = localStorage.getItem('user_name');
    const userRole = localStorage.getItem('user_role');
    
    return {
      isAuthenticated: !!token,
      userName,
      userRole
    };
  },
  
  logout: (navigate: NavigateFunction): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_role');
    
    navigate('/');
  },
  
  checkAuthStatus: (): boolean => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  },
  
  requireAuth: (navigate: NavigateFunction): boolean => {
    const isAuthed = authService.checkAuthStatus();
    if (!isAuthed) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this feature.",
        variant: "destructive"
      });
      navigate('/login');
      return false;
    }
    return true;
  }
};

