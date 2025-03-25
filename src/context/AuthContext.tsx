import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosResponse} from 'axios';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../http/api';

interface PropsUser {
  id: string;
  username: string;
  role: 'SYSADMIN' | 'OWNER' | 'MANAGER' | 'USER';
  restaurantCnpj: string;
}

export interface PropsLoginResponse {
  token: string;
  user: PropsUser;
}

interface PayloadLoginProps {
  username: string;
  password: string;
  cnpj: string;
}

interface AuthContextData {
  user: PropsUser | null;
  mesa: string;
  setMesaStorage: (mesa: string) => void;
  signIn: (
    data: PayloadLoginProps,
  ) => Promise<AxiosResponse<PropsLoginResponse>>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<PropsUser | null>(null);
  const [mesa, setMesa] = useState('');

  const signIn = async (sign: PayloadLoginProps) => {
    const resp: AxiosResponse<PropsLoginResponse> = await api.post(
      '/auth/login',
      sign,
    );
    if (resp.status === 201) {
      await AsyncStorage.setItem('user', JSON.stringify(resp.data.user));
      await AsyncStorage.setItem(
        'access-token',
        JSON.stringify(resp.data.token),
      );
      setUser(resp.data.user);
    }
    return resp;
  };

  const signOut = () => {
    setUser(null);
  };

  const setMesaStorage = async (numMesa: string) => {
    await AsyncStorage.setItem('mesa', numMesa);
    setMesa(numMesa);
  };

  useEffect(() => {
    const fetch = async () => {
      const user = await AsyncStorage.getItem('user');
      const userParse: PropsUser = JSON.parse(user || '');

      const storageMesa = await AsyncStorage.getItem('mesa');
      if (storageMesa) {
        setMesa(storageMesa);
      }

      setUser(userParse);
    };

    fetch();
  }, []);

  return (
    <AuthContext.Provider value={{user, signIn, signOut, mesa, setMesaStorage}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
