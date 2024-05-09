'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { getToken } from '@/app/actions/auth';
import { useAuth } from '@/app/actions/AuthContext';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    confirm_password: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match').required('Confirm password is required'),
});

const RegisterForm = () => {
    const { isAuthenticated, setLogInAuthState, setLogoutAuthState } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
        setIsLoading(true);
        event.preventDefault();
        if (data.password !== data.confirm_password) {
            setError("Passwords don't match");
        }
        try {
            const response = await axios.post('http://localhost:4000/api/auth/register', data);
            const user = await response.data;
            if (user.username) {
                setError('');
                setIsLoading(false);
                router.push('/login');
            } else {
                setIsLoading(false);
                setError('Incorrect username or password');
            }

        } catch (error: any) {
            setIsLoading(false);
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input
                    {...register('username')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="unique username" />
                {errors.username && <p className='text-red-400 text-sm'>{errors.username.message}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                    // type="email" name="email" id="email" 
                    {...register('email')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com" />
                {errors.email && <p className='text-red-400 text-sm'>{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                    type="password" {...register('password')}
                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && <p className='text-red-400 text-sm'>{errors.password.message}</p>}
            </div>
            <div>
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input
                    type="password" {...register('confirm_password')}
                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.confirm_password && <p className='text-red-400 text-sm '>{errors.confirm_password.message}</p>}
            </div>

            {error && <p className='text-red-400 my-3'>{error}</p>}
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign Up
                <ArrowRightIcon className={`ml-auto h-5 w-5 text-gray-50 ${isLoading ? 'animate-ping' : ''}`} />
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Alredy a user? <a href="/login" className="font-medium text-orange-600 hover:underline dark:text-orange-500">Sign Into your account</a>
            </p>
        </form>
    )
}

export default RegisterForm
