import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import {
  Context,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { validString } from "../utils/error.util";
import { auth } from "./firebase.service";

interface IFirebaseContext {
  currentUser: User | null;
  login?: (email: string, password: string) => Promise<UserCredential>;
  register?: (email: string, password: string) => Promise<UserCredential>;
  logout?: () => Promise<void>;
  updateDisplayName?: (firstName: string, lastName: string) => Promise<void>;
}

const defaultValue: IFirebaseContext = {
  currentUser: null,
};

const FirebaseContext: Context<IFirebaseContext> = createContext(defaultValue);

export function useFirebaseAuth() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (email: string, password: string) => {
    if (!validString(email) || !validString(password))
      return Promise.reject({ message: "Invalid fields to register" });

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    if (!validString(email) || !validString(password))
      return Promise.reject({ message: "Invalid fields to login" });

    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateDisplayName = async (firstName: string, lastName: string) => {
    if (!auth.currentUser)
      return Promise.reject({ message: "Current user is null" });

    if (!validString(firstName) || !validString(lastName))
      return Promise.reject({
        message: "Invalid fields to update display name",
      });

    return updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
    });
  };

  const logout = async () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateDisplayName,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}

function RequireAuth({ children }: { children: any }) {
  const { currentUser } = useFirebaseAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

function RequireUnAuth({ children }: { children: any }) {
  const { currentUser } = useFirebaseAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (currentUser) {
    return <Navigate to={from} state={{ from: location }} />;
  }

  return children;
}

export const FirebaseGuards = {
  RequireAuth,
  RequireUnAuth,
};
