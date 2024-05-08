'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../buttons';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/actions/AuthContext';
import { getToken } from '@/app/actions/auth';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

export default function LoginForm() {
    const { isAuthenticated, setLogInAuthState, setLogoutAuthState } = useAuth();
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();
    const accessToken = getToken();

    useEffect(() => {
        if (accessToken) {
            setLogInAuthState();
            if (["/login", '/register'].includes(pathname)) router.replace("/contacts");
        } else {
            setLogoutAuthState();
            if (!["/login", '/register', '/'].includes(pathname)) router.replace("/contacts");
        }
    }, [isAuthenticated, pathname, accessToken])

    const onSubmit = async (data: any, event: any) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:4000/api/auth/login', data);
            const value = await response.data;
            if (value.access_token) {
                localStorage.setItem("accessToken", value.access_token);
                setError('');
                setLogInAuthState()
                setIsLoading(false);
                router.push('/contacts');
            } else {
                setIsLoading(false);
                setError('Incorrect Credentials');
            }
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                    {...register('email')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com" />
                {errors.email && <p className='text-red-200 text-sm font-semi-bold'>{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                    type="password" {...register('password')}
                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && <p className='text-red-200 text-sm font-semi-bold'>{errors.password.message}</p>}
            </div>
            {error && <p className='text-red-200 font-semibold my-3'>{error}</p>}
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
                <ArrowRightIcon className={`ml-auto h-5 w-5 text-gray-50 ${isLoading ? 'animate-ping' : ''}`} />
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="/register" className="font-medium text-orange-600 hover:underline dark:text-orange-500">Sign up</a>
            </p>
        </form>
    );
}
