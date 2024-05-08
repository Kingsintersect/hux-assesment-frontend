'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken } from './auth';

interface AccessTokenContextType {
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
}

const AccessTokenContext = createContext<AccessTokenContextType>({
    accessToken: getToken() || "",
    setAccessToken: () => { },
});

export const useAccessToken = () => useContext(AccessTokenContext);

interface AccessTokenProviderProps {
    children: React.ReactNode;
}

export const AccessTokenProvider: React.FC<AccessTokenProviderProps> = ({ children }) => {
    const [accessToken, setAccessTokenState] = useState<string>('');

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setAccessTokenState(accessToken);
        }
    }, []);

    const setAccessToken = (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        setAccessTokenState(accessToken);
    };

    return (
        <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AccessTokenContext.Provider>
    );
};
