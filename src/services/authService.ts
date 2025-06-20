import { NavigateFunction } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { UserRole } from "@/types/user";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export interface AuthState {
  isAuthenticated: boolean;
  userName: string | null;
  userRole: UserRole | null;
  userId: string | null;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  // Register a new user
  register: async (data: RegisterData): Promise<AuthState> => {
    try {
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      // Update the user profile with the name
      await updateProfile(user, {
        displayName: data.name
      });
      
      // Create a user document in Firestore with additional info
      await setDoc(doc(db, 'users', user.uid), {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber || '',
        role: UserRole.USER,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      // Set local storage items for client-side auth state
      localStorage.setItem('user_name', data.name);
      localStorage.setItem('user_role', UserRole.USER);
      
      return {
        isAuthenticated: true,
        userName: data.name,
        userRole: UserRole.USER,
        userId: user.uid
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Failed to register');
    }
  },
  
  // Login an existing user
  login: async (data: LoginData): Promise<AuthState> => {
    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Set local storage items for client-side auth state
        localStorage.setItem('user_name', userData.name);
        localStorage.setItem('user_role', userData.role);
        
        return {
          isAuthenticated: true,
          userName: userData.name,
          userRole: userData.role,
          userId: user.uid
        };
      } else {
        throw new Error('User data not found');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login');
    }
  },
  
  getAuthStatus: (): AuthState => {
    const currentUser = auth.currentUser;
    const userName = localStorage.getItem('user_name');
    const userRole = localStorage.getItem('user_role') as UserRole | null;
    
    return {
      isAuthenticated: !!currentUser,
      userName,
      userRole,
      userId: currentUser?.uid || null
    };
  },
  
  logout: async (navigate: NavigateFunction): Promise<void> => {
    try {
      await signOut(auth);
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_role');
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message || 'Failed to logout');
    }
  },
  
  checkAuthStatus: (): boolean => {
    return !!auth.currentUser;
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
  },
  
  // Listen for auth state changes
  onAuthStateChange: (callback: (user: FirebaseUser | null) => void) => {
    return onAuthStateChanged(auth, callback);
  }
};
