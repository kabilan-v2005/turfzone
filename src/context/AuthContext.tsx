import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged,
  signOut as firebaseSignOut,
  isSignInWithEmailLink,
  signInWithEmailLink
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  isEmailVerified: boolean;
}

const initialContext: AuthContextType = {
  currentUser: null,
  loading: true,
  logout: async () => {},
  isEmailVerified: false,
};

const AuthContext = createContext<AuthContextType>(initialContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Check for email sign-in link on page load
  useEffect(() => {
    const checkEmailLink = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localStorage.getItem('emailForSignIn');
        
        if (!email) {
          return; // Let the Login component handle this case
        }
        
        try {
          await signInWithEmailLink(auth, email, window.location.href);
          localStorage.removeItem('emailForSignIn');
          localStorage.removeItem('usernameForSignIn');
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error("Error signing in with email link:", error);
        }
      }
    };
    
    checkEmailLink();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsEmailVerified(!!user?.email);
      setLoading(false);
      
      if (user?.email) {
        // Store basic user info in localStorage for components that need it
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          isAuthenticated: true
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    currentUser,
    loading,
    logout,
    isEmailVerified
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
