'use client';
import { ReactNode, createContext, useContext, useState } from 'react';
import { deleteToken, getToken } from './auth';

interface AuthContextType {
    isAuthenticated: boolean;
    accessToken: string | null;
    setLogInAuthState: () => void;
    setLogoutAuthState: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    accessToken: '',
    setLogInAuthState: () => { },
    setLogoutAuthState: () => { },
});

interface AuthProp {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProp> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const setLogInAuthState = () => {
        setAccessToken(getToken())
        setIsAuthenticated(true);
    };

    const setLogoutAuthState = () => {
        deleteToken();
        setAccessToken(null)
        setIsAuthenticated(false);
    };

    return <AuthContext.Provider value={{ isAuthenticated, accessToken, setLogInAuthState, setLogoutAuthState }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
