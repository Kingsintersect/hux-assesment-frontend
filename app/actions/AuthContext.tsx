'use client';
import { ReactNode, createContext, useContext, useState } from 'react';
import { deleteToken } from './auth';

interface AuthContextType {
    isAuthenticated: boolean;
    setLogInAuthState: () => void;
    setLogoutAuthState: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setLogInAuthState: () => { },
    setLogoutAuthState: () => { },
});

interface AuthProp {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProp> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const setLogInAuthState = () => {
        setIsAuthenticated(true);
    };

    const setLogoutAuthState = () => {
        deleteToken();
        setIsAuthenticated(false);
    };

    return <AuthContext.Provider value={{ isAuthenticated, setLogInAuthState, setLogoutAuthState }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
