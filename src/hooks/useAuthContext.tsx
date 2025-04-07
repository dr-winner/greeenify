
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, AuthState } from '@/services/authService';

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
    userRole: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    const updateAuthState = () => {
      const currentState = authService.getAuthStatus();
      setAuthState(currentState);
    };
    
    updateAuthState();
    
    // Listen for storage events (for multi-tab support)
    window.addEventListener('storage', updateAuthState);
    
    return () => {
      window.removeEventListener('storage', updateAuthState);
    };
  }, []);

  const contextValue: AuthContextType = {
    ...authState,
    logout: () => {
      authService.logout(navigate);
      setAuthState({
        isAuthenticated: false,
        userName: null,
        userRole: null
      });
    },
    checkAuthStatus: () => authService.checkAuthStatus(),
    requireAuth: () => authService.requireAuth(navigate)
  };

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
