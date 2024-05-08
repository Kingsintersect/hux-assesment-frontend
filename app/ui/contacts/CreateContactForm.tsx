'use client';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/actions/AuthContext";
import { getToken } from "@/app/actions/auth";
import Spinner from "../Spinner";

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    phoneNumber: yup.string().required('Phone Number is required'),
});

const CreateContactForm = () => {
    const { isAuthenticated, setLogoutAuthState } = useAuth();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const accessToken = getToken();

    useEffect(() => {
        const validateToken = async () => {
            if (!accessToken) {
                setError('No token found.');
                setLogoutAuthState();
                router.push('/login');
            }
        };

        validateToken();
    }, [isAuthenticated, accessToken]);

    const onSubmit = async (data: any, event: any) => {
        event.preventDefault();
        if (accessToken) {
            setIsLoading(true);
            try {
                const response = await axios.post(`http://localhost:4000/api/contacts`, data, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const value = await response.data;
                if (value.phoneNumber) {
                    setError('');
                    setIsLoading(false)
                    router.push('/contacts');
                } else {
                    setIsLoading(false)
                    setError('Incorrect Credentials');
                }

            } catch (error: any) {
                setError(error.response.data.message);
            } finally {
                setIsLoading(false)
            }
        } else {
            setError('No token found.');
            setLogoutAuthState();
            router.push('/login');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
                <input
                    {...register('firstName')}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                {errors.firstName && <p className='text-red-500 font-semi-bold'>{errors.firstName.message}</p>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    {...register('lastName')}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                {errors.lastName && <p className='text-red-500 font-semi-bold'>{errors.lastName.message}</p>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="tel"
                    pattern="[0-9]{11}"
                    {...register('phoneNumber')}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="phoneNumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Phone number <span className="text-orange-500">(08012345689)</span></label>
                {errors.phoneNumber && <p className='text-red-200 text-sm font-semi-bold'>{errors.phoneNumber.message}</p>}
            </div>
            {error && <p className='text-red-400 font-semibold'>{error}</p>}
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {isLoading && <Spinner />}
                Submit
            </button>
        </form>
    )
}

export default CreateContactForm