import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {io, Socket} from 'socket.io-client';
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
  appToken: string;
}

interface PayloadLoginProps {
  username: string;
  password: string;
  cnpj: string;
}

interface AuthContextData {
  user: PropsUser | null;
  mesa: PropsMesa;
  dataSettings: PropsSettings | null;
  settings: UseQueryResult<{
    data: PropsSettings;
  }>;
  setMesaStorage: (mesa: string, id: string) => void;
  signIn: (
    data: PayloadLoginProps,
  ) => Promise<AxiosResponse<PropsLoginResponse>>;
  signOut: () => void;
  isAuthenticated: () => boolean;
  hasMesaSelected: () => boolean;
  checkAuthAndTable: () => {isAuthenticated: boolean; hasMesa: boolean};
}

interface PropsMesa {
  mesa: number;
  idMesa: string;
}
const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export interface PropsSettings {
  cnpj: string;
  name: string;
  logo: string;
  email: string;
  adminPassword: string;
  printerNotification: string | null;
  printerBill: string | null;
  ipPrintNotification: string | null;
  ipPrintBill: string | null;
  portaPrintNotification: number | null;
  portaPrintBill: number | null;
  phone: string;
  Banner: {
    id: string;
    url: string;
    nome: string;
  }[];
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<PropsUser | null>(null);
  const [dataSettings, setDataSettings] = useState<PropsSettings | null>(null);

  const [mesa, setMesa] = useState<{mesa: number; idMesa: string}>(
    {} as PropsMesa,
  );
  const [socket, setSocket] = useState<Socket | null>(null);

  const settings: UseQueryResult<{
    data: PropsSettings;
  }> = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const resp = await api.get('/settings');
      return resp.data;
    },
  });

  if (settings.isFetched) {
    AsyncStorage.setItem('settings', JSON.stringify(settings.data?.data));
  }

  const signIn = async (sign: PayloadLoginProps) => {
    const resp: AxiosResponse<PropsLoginResponse> = await api.post(
      '/auth/login',
      sign,
    );
    if (resp.status === 201) {
      await AsyncStorage.setItem('user', JSON.stringify(resp.data.user));
      await AsyncStorage.setItem(
        'app-token',
        JSON.stringify(resp.data.appToken),
      );
      await AsyncStorage.setItem(
        'access-token',
        JSON.stringify(resp.data.token),
      );
      settings.refetch();
      setUser(resp.data.user);
      // O socket será conectado automaticamente pelo useEffect que depende do user
    }
    return resp;
  };

  const signOut = async () => {
    try {
      // Desconecta o socket se existir
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }

      // Remove todos os dados do AsyncStorage primeiro
      await AsyncStorage.multiRemove([
        'user',
        'access-token',
        'app-token',
        'mesa',
        'settings',
        'form-login-save',
        'save-pass',
      ]);

      // Depois limpa os estados
      setUser(null);
      setMesa({} as PropsMesa);

      // Espera um momento para garantir que todas as operações foram completadas
      await new Promise(resolve => setTimeout(resolve, 50));

      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error; // Propaga o erro para ser tratado no componente
    }
  };

  const setMesaStorage = async (numMesa: string, idMesa: string) => {
    await AsyncStorage.setItem('mesa', JSON.stringify({num: numMesa, idMesa}));
    setMesa({mesa: Number(numMesa), idMesa});
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const hasMesaSelected = () => {
    return mesa && mesa.idMesa ? true : false;
  };

  const checkAuthAndTable = () => {
    return {
      isAuthenticated: isAuthenticated(),
      hasMesa: hasMesaSelected(),
    };
  };

  useEffect(() => {
    const fetch = async () => {
      const user = await AsyncStorage.getItem('user');
      const settings = await AsyncStorage.getItem('settings');
      if (settings) {
        setDataSettings(JSON.parse(settings));
      }

      const storageMesa = await AsyncStorage.getItem('mesa');
      if (storageMesa) {
        const mesa = JSON.parse(storageMesa);
        setMesa({mesa: Number(mesa.num), idMesa: mesa.idMesa});
      }

      if (user) {
        const userParse: PropsUser = JSON.parse(user);
        setUser(userParse);
      }
    };

    fetch();
  }, []);

  // Conecta ao socket e configura o listener para 'settings:updated'
  useEffect(() => {
    // Só conecta ao socket se o usuário estiver autenticado
    if (user) {
      // Conecta ao mesmo endereço da API
      const socketInstance = io(
        api.defaults.baseURL || 'https://api.bistro.app.br/',
      );

      socketInstance.on('connect', () => {
        // Envia o CNPJ do restaurante ao conectar para se juntar à sala específica
        if (user.restaurantCnpj) {
          socketInstance.emit('join:restaurant', user.restaurantCnpj);
          console.log(`Socket conectado para o CNPJ: ${user.restaurantCnpj}`);
        }
      });

      // Escuta apenas atualizações específicas para o CNPJ do restaurante
      socketInstance.on(`settings:updated:${user.restaurantCnpj}`, () => {
        console.log(`Recebida atualização para o CNPJ: ${user.restaurantCnpj}`);
        settings.refetch();
      });

      socketInstance.on('disconnect', () => {
        console.log('Socket desconectado');
      });

      socketInstance.on('connect_error', error => {
        console.error('Erro na conexão do socket:', error);
      });

      setSocket(socketInstance);

      // Limpeza ao desmontar o componente ou quando o usuário fizer logout
      return () => {
        if (socketInstance) {
          console.log('Desconectando socket...');
          socketInstance.disconnect();
        }
      };
    } else if (socket) {
      // Se não há usuário mas existe um socket, desconecta
      console.log('Usuário deslogado, desconectando socket...');
      socket.disconnect();
      setSocket(null);
    }
  }, [user]); // Dependência alterada para user para reconectar quando o usuário mudar

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        dataSettings,
        mesa,
        setMesaStorage,
        settings,
        isAuthenticated,
        hasMesaSelected,
        checkAuthAndTable,
      }}>
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
