import { createContext, useState, } from 'react';
import type {ReactNode} from 'react';
import type { User } from '../types';


// what our auth will ask for
type AuthContextType={
    user: User | null;
    token: string | null;
    login: (userData: any, token:string) => void;
    logout: () => void;
};

//create my context 
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

//give auth the necessary info and this component should essentially cover the app
export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (userData: any, token:string) => {
        setUser(userData);
        setToken(token);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');

    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}