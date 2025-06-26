import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { loginUser } from '../api/login';
import { LoginRequestDto, UserDto } from '@cracha/shared-types';
import { fetchUserApi } from '../api/user';

interface AuthContextType {
  user: UserDto | null | undefined;
  isLoading: boolean;
  login: (userData: LoginRequestDto) => Promise<void>;
  logout: () => void;
  fetchUser: (accessToken: string) => Promise<UserDto | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDto | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const userLocalStorage = localStorage.getItem('user');
      if (!userLocalStorage) {
        setIsLoading(false);
        return;
      }
      const storedUser = JSON.parse(
        localStorage.getItem('user') as string
      ) as UserDto;
      setUser(storedUser);
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (userData: LoginRequestDto) => {
    const { accessToken, user } = await loginUser(userData);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  };

  if (isLoading) {
    return null;
  }

  const fetchUser = async (accessToken: string): Promise<UserDto | null> => {
    try {
      const user = await fetchUserApi(accessToken);
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (_e) {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ fetchUser, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
