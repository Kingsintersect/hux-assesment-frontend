'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '../buton';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    confirm_password: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match').required('Confirm password is required'),
});

const RegisterForm = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: any, event: any) => {
        event.preventDefault();
        console.log(data);
        if (data.password !== data.confirm_password) {
            console.log("didt match")
            setError("Passwords don't match");
        }
        try {
            const response = await axios.post('http://localhost:4000/api/auth/register', data);
            const user = await response.data;
            if (user.username) {
                setError('');
                router.push('/login');
            } else {
                // setSubmitting(false);
                setError('Incorrect username or password');
                // Clear password field
                const usernameInput = document.getElementById('email') as HTMLInputElement | null;
                if (usernameInput) {
                    // usernameInput.focus();
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
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input
                    {...register('username')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="unique username" />
                {errors.username && <p className='text-red-500 font-semi-bold'>{errors.username.message}</p>}
            </div>
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
            <div>
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input
                    type="password" {...register('confirm_password')}
                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {errors.confirm_password && <p className='text-red-500 font-semi-bold'>{errors.confirm_password.message}</p>}
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <RegisterButton />
            {/* <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button> */}

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Alredy a user? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-blue-500">Sign Into your account</a>
            </p>
        </form>
    )
}

export default RegisterForm

function RegisterButton({ value = "Register" }: { value?: string }) {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            {value} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}