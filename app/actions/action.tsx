'use client';
import { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export const CheckLogin = () => {
    const router = useRouter();

    // Check if user is loggedin otherwise redirect the user to log in
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            router.replace('/login');
        } else {

        }
    }, [router]);
}
