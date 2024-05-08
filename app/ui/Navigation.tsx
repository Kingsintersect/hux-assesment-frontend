'use client';
import React, { useState, useRef, useEffect } from 'react';
import AppLogo from './app-logo'
import { deleteToken, getToken } from '../actions/auth';
import { useAuth } from '../actions/AuthContext';
import { PowerIcon } from '@heroicons/react/24/outline';


const Navigation = () => {
    const { isAuthenticated, setLogoutAuthState, setLogInAuthState } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    let accessToken = getToken();


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    // Close the menu when clicking outside of it
    const handleClickOutside = (event: any) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            closeMenu();
        }
    };

    const handleLogout = (): void => {
        console.log("clicked")
        setLogoutAuthState();
        deleteToken();
    }

    useEffect(() => {
        if (accessToken) {
            setLogInAuthState
            setIsLoggedIn(!!accessToken);
        } else {
            setLogoutAuthState();
            setIsLoggedIn(!!accessToken);
        }
    }, [isAuthenticated, setIsLoggedIn, accessToken]);

    return (
        <nav className="p-6 fixed top-0 left-0 w-full z-50">

            <div className="container mx-auto flex justify-between items-center">
                <div className="">
                    <AppLogo />
                </div>
                <button onClick={toggleMenu} className="text-white md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <ul className="hidden md:flex md:justify-center md:items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            <li className='hover:text-blue-500'><a href="/contacts" className="">My Contacts</a></li>
                            <li>
                                <button className='flex justify-between items-center cursor-pointer hover:text-red-300' onClick={handleLogout}>
                                    <span className='inline-block mr-2'>Logout</span>
                                    <PowerIcon className="w-5 rounded-md border border-red-300  text-red-300  p-1 hover:bg-red-500 hover:text-white" />
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='hover:text-blue-500'><a href="/login" className="">Sign In</a></li>
                            <li className='hover:text-blue-500'><a href="/register" className="">Create An Account</a></li>
                        </>
                    )}

                </ul>
            </div>
            {/* Mobile Menu */}
            <div ref={menuRef} className="mobile-menu fixed inset-0 z-50 hidden">
                {/* <ul className="flex flex-col items-center justify-center h-full space-y-4">
                    {isLoggedIn ? (
                        <>
                            <li className='hover:text-blue-500'><a href="/contacts" className="">My Contacts</a></li>
                            <li>
                                <button className='flex justify-between items-center cursor-pointer hover:text-red-300' onClick={handleLogout}>
                                    <span className='inline-block mr-2'>Logout</span>
                                    <PowerIcon className="w-5 rounded-md border border-red-300  text-red-300  p-1 hover:bg-red-500 hover:text-white" />
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='hover:text-blue-500'><a href="/login" className="">Sign In</a></li>
                            <li className='hover:text-blue-500'><a href="/register" className="text-blue">Create An Account</a></li>
                        </>
                    )}
                </ul> */}
            </div>
        </nav>
    )
}

export default Navigation