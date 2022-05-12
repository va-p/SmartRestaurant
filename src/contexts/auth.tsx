import {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react';
import { Alert } from 'react-native';

import api from '@api/api';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  token: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  userType: string;
}

interface AuthContextData {
  signInWithXano(SignInUser: any): Promise<void>;
  user: User;
}

//Crio meu contexto com o nome que eu escolhi: "AuthContext", o nome pode ser qualquer um
export const AuthContext = createContext({} as AuthContextData);

//Crio o "Provider" do meu contexto
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function signInWithXano(SignInUser: any) {
    const loginForm = {
      email: SignInUser.email,
      password: SignInUser.password
    }

    try {
      const { data, status } = await api.post('auth/login', loginForm);
      if (status == 200) {
        const userData = {
          id: data.user.id,
          name: data.user.name,
          lastName: data.user.last_name,
          email: data.user.email,
          token: data.user.token,
          phone: data.user.phone,
          userType: data.user.user_type,
          isAdmin: data.user.is_admin
        }
        setUser(userData);
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert('Redefinir senha', 'Informe o e-mail.');
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      signInWithXano
    }}>
      {children}
    </AuthContext.Provider>
  )
}

//Crio meu próprio hook "useAuth" e passo o contexto que criei acima "AuthContext"
function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

//exporto o meu "Provider" e o meu hook "useAuth"
export { AuthProvider, useAuth }