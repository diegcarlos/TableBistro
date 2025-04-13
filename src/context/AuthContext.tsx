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

export interface PropsUser {
  id: string;
  username: string;
  role: 'SYSADMIN' | 'OWNER' | 'MANAGER' | 'USER';
  restaurantCnpj: string;
  nome: string;
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
  mesa: PropsMesa;
  settings: {
    cnpj: string;
    name: string;
    logo: string;
    email: string;
    phone: string;
    Banner: {
      id: string;
      url: string;
      nome: string;
    }[];
  };
  setMesaStorage: (mesa: string, id: string) => void;
  signIn: (
    data: PayloadLoginProps,
  ) => Promise<AxiosResponse<PropsLoginResponse>>;
  signOut: () => void;
}

interface PropsMesa {
  mesa: number;
  idMesa: string;
}
const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<PropsUser | null>(null);
  const [mesa, setMesa] = useState<{mesa: number; idMesa: string}>(
    {} as PropsMesa,
  );
  const [settings, setSettings] = useState({
    cnpj: '',
    name: '',
    logo: '',
    email: '',
    phone: '',
    Banner: [] as {id: string; url: string; nome: string}[],
  });

  const onSettings = async () => {
    const stt = await api.get('/settings');
    if (stt.status === 200) {
      await AsyncStorage.setItem('settings', JSON.stringify(stt.data));
      setSettings(stt.data);
    }
  };

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
      onSettings();
      setUser(resp.data.user);
    }
    return resp;
  };

  const signOut = () => {
    setUser(null);
  };

  const setMesaStorage = async (numMesa: string, idMesa: string) => {
    await AsyncStorage.setItem('mesa', JSON.stringify({num: numMesa, idMesa}));
    setMesa({mesa: Number(numMesa), idMesa});
  };

  useEffect(() => {
    const fetch = async () => {
      const user = await AsyncStorage.getItem('user');
      const userParse: PropsUser = JSON.parse(user || '');
      const settings = await AsyncStorage.getItem('settings');
      if (settings) {
        const settingsParse = JSON.parse(settings);
        setSettings(settingsParse);
      }

      const storageMesa = await AsyncStorage.getItem('mesa');
      if (storageMesa) {
        const mesa = JSON.parse(storageMesa);
        setMesa({mesa: Number(mesa.num), idMesa: mesa.idMesa});
      }

      setUser(userParse);
    };

    fetch();
  }, []);

  return (
    <AuthContext.Provider
      value={{user, signIn, signOut, mesa, setMesaStorage, settings}}>
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
