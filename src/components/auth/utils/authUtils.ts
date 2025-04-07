
import { NavigateFunction } from 'react-router-dom';
import { toast as toastFunction } from "@/hooks/use-toast";
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
  
  // Prepare data for API
  const apiData = {
    email: userData.email,
    password: userData.password,
    name: userData.name,
    role: mode === 'register' ? userData.role : undefined,
    phoneNumber: mode === 'register' ? userData.phoneNumber : undefined
  };
  
  // Simulate authentication with API call
  fetch(`https://api.yourbackend.com/api/auth/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(apiData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(mode === 'login' ? 'Invalid credentials' : 'Registration failed');
    }
    return response.json();
  })
  .then(data => {
    setIsLoading(false);
    
    // Store auth token and user info
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('user_role', data.user.role);
    localStorage.setItem('user_id', data.user.id);
    localStorage.setItem('user_name', data.user.name);
    
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
    navigate('/dashboard');
    
    // Trigger storage event for multi-tab support
    window.dispatchEvent(new Event('storage'));
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
