import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { auth } from '../server/firebase';

interface IAuthContextProvider {
  children: ReactNode;
}

export const AuthContext = createContext<User | null>(null);

export const AuthContextProvider: FC<IAuthContextProvider> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
