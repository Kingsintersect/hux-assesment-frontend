'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../buttons';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/actions/AuthContext';
import { getToken } from '@/app/actions/auth';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

export default function LoginForm() {
    const { isAuthenticated, setLogInAuthState } = useAuth();
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const router = useRouter();
    const accessToken = getToken();

    useEffect(() => {
        if (accessToken) {
            setLogInAuthState();
            router.push("/contacts")
        }
    }, [isAuthenticated, accessToken])

    const onSubmit = async (data: any, event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', data);
            const value = await response.data;
            if (value.access_token) {
                localStorage.setItem("accessToken", value.access_token);
                setError('');
                setLogInAuthState()
                // router.push('/contacts');
            } else {
                setError('Incorrect Credentials');
            }
        } catch (error: any) {
            setError(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                    // type="email" name="email" id="email" 
                    {...register('email')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com" />
                {errors.email && <p className='text-red-500 font-semi-bold'>{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                    type="password" {...register('password')}
                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && <p className='text-red-500 font-semi-bold'>{errors.password.message}</p>}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <LoginButton />

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-blue-500">Sign up</a>
            </p>
        </form>
    );
}

function LoginButton({ value = "Log In" }: { value?: string }) {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            {value} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}
