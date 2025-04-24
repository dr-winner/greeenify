import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { firebaseAuthService, AuthState } from '@/services/firebaseAuthService';
import { useToast } from "@/hooks/use-toast";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type AuthContextType = AuthState & {
  logout: () => void;
  checkAuthStatus: () => boolean;
  requireAuth: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userName: null,
    userRole: null,
    userId: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      try {
        if (user) {
          // User is signed in
          const userName = localStorage.getItem('user_name');
          const userRole = localStorage.getItem('user_role');
          
          setAuthState({
            isAuthenticated: true,
            userName,
            userRole: userRole as any,
            userId: user.uid
          });

          // Redirect to shop page if user is on login or signup page
          if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
            navigate('/shop');
          }
        } else {
          // User is signed out
          setAuthState({
            isAuthenticated: false,
            userName: null,
            userRole: null,
            userId: null
          });
        }
      } catch (error) {
        console.error('Error updating auth state:', error);
      } finally {
        setIsLoading(false);
      }
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate, location.pathname]);

  const contextValue: AuthContextType = {
    ...authState,
    logout: async () => {
      try {
        await firebaseAuthService.logout(navigate);
        toast({
          title: "Logged out",
          description: "You have been successfully logged out.",
        });
      } catch (error) {
        console.error('Error during logout:', error);
        toast({
          title: "Logout Error",
          description: "There was a problem logging out. Please try again.",
          variant: "destructive"
        });
      }
    },
    checkAuthStatus: () => {
      return firebaseAuthService.checkAuthStatus();
    },
    requireAuth: () => {
      return firebaseAuthService.requireAuth(navigate);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
