import { createContext, useState, ReactNode } from 'react';

// what our auth will ask for
type AuthContextType={
    user: any | null;
    token: string | null;
    login: (userData: any, token:string) => void;
    logout: () => void;
};

//create context 
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

//give auth the necessary info and this component should essentially cover the app
export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (userData: any, token:string) => {
        setUser(userData);
        setToken(token);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };
    
}