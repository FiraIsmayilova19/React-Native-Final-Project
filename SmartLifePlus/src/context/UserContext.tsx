import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  firstName: string;
  lastName: string;
  bio?: string;
  avatar?: string; 
}

interface UserCtx {
  user: UserProfile | null;
  saveUser: (u: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserCtx>({ user: null, saveUser: async () => {}, logout: async () => {} });

export const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('user_profile');
      if (raw) setUser(JSON.parse(raw));
    })();
  }, []);

  const saveUser = async (u: UserProfile) => {
    await AsyncStorage.setItem('user_profile', JSON.stringify(u));
    setUser(u);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  const value = useMemo(() => ({ user, saveUser, logout }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
