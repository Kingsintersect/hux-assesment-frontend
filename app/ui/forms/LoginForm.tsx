'use client';

import { lusitana } from '@/app/ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../buton';
import { useFormStatus } from 'react-dom';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});



export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: any, event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', data);
            const value = await response.data; console.log(value.acce)
            if (value.access_token) {
                setError('');
                localStorage.setItem("access_token", value.access_token);
                // setSubmitting(false);
                // redirect
                router.push('/contacts');
                return true;
            } else {
                // setSubmitting(false);
                setError('Incorrect Credentials');
                // Clear password field
                const usernameInput = document.getElementById('email') as HTMLInputElement | null;
                if (usernameInput) {
                    usernameInput.focus();
                }
            }

        } catch (error: any) {
            // If an error occurs during form submission, set the error message
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

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}
