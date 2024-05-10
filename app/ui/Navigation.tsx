'use client';
import React, { useState, useRef, useEffect } from 'react';
import AppLogo from './app-logo'
import { deleteToken, getToken } from '../actions/auth';
import { useAuth } from '../actions/AuthContext';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useRouter, usePathname } from 'next/navigation';


const Navigation = () => {
    const { isAuthenticated, setLogoutAuthState, setLogInAuthState } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname()
    const router = useRouter();
    let accessToken = getToken();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = (): void => {
        deleteToken();
        setIsLoggedIn(false);
        setLogoutAuthState();
        // router.push("/");
    }

    useEffect(() => {
        console.log(accessToken, 'nav')
        if (accessToken) {
            setLogInAuthState
            setIsLoggedIn(!!accessToken);
            if (["/login", '/register'].includes(pathname)) router.replace("/contacts");
        } else {
            setLogoutAuthState();
            setIsLoggedIn(!!accessToken);
            if (!["/login", '/register', '/'].includes(pathname)) router.replace("/login");
        }
    }, [pathname, isAuthenticated, setIsLoggedIn, accessToken]);

    return (
        <nav className="p-6 fixed top-0 left-0 w-full z-50 bg-[#192c61fc]">

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
                            <li className='hover:text-orange-300'><a href="/contacts" className="">My Contacts</a></li>
                            <li>
                                <button className='flex justify-between items-center cursor-pointer hover:text-red-300' onClick={handleLogout}>
                                    <span className='inline-block mr-2'>Logout</span>
                                    <PowerIcon className="w-5 rounded-md border border-red-300  text-red-300  p-1 hover:bg-red-500 hover:text-white" />
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='hover:text-orange-300'><a href="/login" className="">Sign In</a></li>
                            <li className='hover:text-orange-300'><a href="/register" className="">Create An Account</a></li>
                        </>
                    )}

                </ul>
                {/* Mobile Menu */}
                <div ref={menuRef} className={`${isOpen ? 'block' : 'hidden'} md:hidden mobile-menu absolute inset-0 -z-10 `}>
                    <ul className="flex flex-col items-center justify-center h-full space-y-4 bg-[#192c61fc] " style={{ position: "relative", top: "90px" }}>
                        {isLoggedIn ? (
                            <>
                                <li className='hover:text-orange-300'><a href="/contacts" className="">My Contacts</a></li>
                                <li>
                                    <button className='flex justify-between items-center cursor-pointer hover:text-red-300' onClick={handleLogout}>
                                        <span className='inline-block mr-2'>Logout</span>
                                        <PowerIcon className="w-5 rounded-md border border-red-300  text-red-300  p-1 hover:bg-red-500 hover:text-white" />
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li onClick={toggleMenu} className='hover:text-orange-300'><a href="/login" className="">Sign In</a></li>
                                <li onClick={toggleMenu} className='hover:text-orange-300'><a href="/register" className="text-blue">Create An Account</a></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation