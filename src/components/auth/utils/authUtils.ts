import { NavigateFunction } from 'react-router-dom';
import { toast as toastFunction } from "@/hooks/use-toast";
import { firebaseAuthService } from "@/services/firebaseAuthService";
import { UserRole } from "@/types/user";

type AuthMode = 'login' | 'register';

interface AuthData {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
  phoneNumber?: string;
}

export const handleAuth = (
  mode: AuthMode,
  userData: AuthData,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  toast: typeof toastFunction,
  navigate: NavigateFunction
) => {
  setIsLoading(true);
  
  // Use Firebase Auth Service
  const authPromise = mode === 'login' 
    ? firebaseAuthService.login({ 
        email: userData.email, 
        password: userData.password 
      })
    : firebaseAuthService.register({
        email: userData.email,
        password: userData.password,
        name: userData.name || '',
        phoneNumber: userData.phoneNumber
      });
  
  authPromise
    .then(data => {
      setIsLoading(false);
      
      if (mode === 'login') {
        toast({
          title: "Logged in successfully!",
          description: "Welcome back to Greenify.",
        });
      } else {
        toast({
          title: "Registration successful!",
          description: "Your account has been created.",
        });
      }
      navigate('/shop');
    })
    .catch(error => {
      setIsLoading(false);
      toast({
        title: mode === 'login' ? "Login failed" : "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    });
};
