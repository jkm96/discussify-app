import {createContext} from 'react';
import {User} from '@/boundary/interfaces/user';
import {AccessTokenModel} from '@/boundary/interfaces/token';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  storeAuthToken: (tokenData: AccessTokenModel) => Promise<boolean>;
  clearAuthToken: () => void;
};

const AuthContextDefaultValue: AuthContextType = {
  user: null,
  loading: true,
  storeAuthToken: async(tokenData: AccessTokenModel) => false,
  clearAuthToken: () => {},
};

const AuthContext = createContext<AuthContextType>(AuthContextDefaultValue);

export default AuthContext;
