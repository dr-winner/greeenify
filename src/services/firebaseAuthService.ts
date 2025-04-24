import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  AuthError
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { NavigateFunction } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { UserRole } from "@/types/user";

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

// Helper function to get readable error message
const getFirebaseErrorMessage = (error: any): string => {
  const errorCode = error?.code || '';
  
  // Common Firebase Auth error codes
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please use a different email or try logging in.';
    case 'auth/invalid-email':
      return 'The email address is invalid. Please check and try again.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please check or register.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again or reset your password.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use a stronger password.';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed. Please contact support.';
    case 'auth/configuration-not-found':
      return 'Firebase configuration not found. Please check your Firebase project setup in the Firebase Console and verify your environment variables.';
    default:
      console.error('Firebase auth error:', error);
      return error?.message || 'An unknown error occurred. Please try again later.';
  }
};

export const firebaseAuthService = {
  // Register a new user
  register: async (data: RegisterData): Promise<AuthState> => {
    try {
      console.log('Starting registration process with:', { email: data.email, name: data.name });
      
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      console.log('User created successfully:', user.uid);
      
      // Update the user profile with the name
      await updateProfile(user, {
        displayName: data.name
      });
      
      console.log('User profile updated with name:', data.name);
      
      // Create a user document in Firestore with additional info
      await setDoc(doc(db, 'users', user.uid), {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber || '',
        role: UserRole.USER,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log('User document created in Firestore');
      
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
      const errorMessage = getFirebaseErrorMessage(error);
      throw new Error(errorMessage);
    }
  },
  
  // Login an existing user
  login: async (data: LoginData): Promise<AuthState> => {
    try {
      console.log('Starting login process with:', { email: data.email });
      
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      console.log('User signed in successfully:', user.uid);
      
      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        console.log('User data retrieved from Firestore:', userData);
        
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
        console.error('User document not found in Firestore');
        throw new Error('User data not found. Please contact support.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = getFirebaseErrorMessage(error);
      throw new Error(errorMessage);
    }
  },
  
  // Get current auth state
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
  
  // Logout the current user
  logout: async (navigate: NavigateFunction): Promise<void> => {
    try {
      console.log('Starting logout process');
      await signOut(auth);
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_role');
      console.log('User logged out successfully');
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      const errorMessage = getFirebaseErrorMessage(error);
      throw new Error(errorMessage);
    }
  },
  
  // Check if user is authenticated
  checkAuthStatus: (): boolean => {
    return !!auth.currentUser;
  },
  
  // Require authentication for protected routes
  requireAuth: (navigate: NavigateFunction): boolean => {
    const isAuthed = firebaseAuthService.checkAuthStatus();
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
