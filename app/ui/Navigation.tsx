'use client';
import React, { useState, useRef, useEffect } from 'react';
import AppLogo from './app-logo'
import Image from 'next/image';


const triggerMenu = () => {
    const menuButton = document.querySelector('button');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuButton?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
    });
}
const Navigation = () => {
    const isLoggedIn = false;

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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

    // Attach click event listener to the document to handle clicks outside the menu
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <nav className="w-full p-6">

            <div className="container mx-auto flex justify-between items-center">
                <div className="">
                    <AppLogo />
                </div>
                <button onClick={toggleMenu} className="text-white md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <ul className="hidden md:flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            <li><a href="/login" className="">Sign In</a></li>
                            <li><a href="/register" className="">Create An Account</a></li>

                        </>
                    ) : (
                        <>
                            <li><a href="/contacts" className="">My Contacts</a></li>
                            <li><a href="/logout" className="">Logout</a></li>

                        </>
                    )}

                </ul>
            </div>
            {/* Mobile Menu */}
            <div ref={menuRef} className="mobile-menu fixed inset-0 z-50 hidden">
                <ul className="flex flex-col items-center justify-center h-full space-y-4">
                    {isLoggedIn ? (
                        <>
                            <li><a href="/login" className="">Sign In</a></li>
                            <li><a href="/register" className="">Create An Account</a></li>

                        </>
                    ) : (
                        <>
                            <li><a href="/contacts" className="">My Contacts</a></li>
                            <li><a href="/logout" className="">Logout</a></li>

                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navigation