'use client';
import { getSingleUserRequest } from '@/app/actions/action';
import { useEffect, useState } from 'react';
import { Contact } from '@/app/actions/Types';
import { usePathname, useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/app/actions/AuthContext';
import { getToken } from '@/app/actions/auth';
import Spinner from '../Spinner';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    phoneNumber: yup.string().required('Phone Number is required'),
});

interface ContactForm {
    firstName: string
    lastName: string
    phoneNumber: string
}

export default function EditInvoiceForm({ contactId }: { contactId: string; }) {
    const { isAuthenticated, setLogoutAuthState } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const { register, setValue, reset, handleSubmit, formState: { errors } } = useForm<ContactForm>({ resolver: yupResolver(schema) });
    const [contact, setContacts] = useState<Contact | null>();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const accessToken = getToken();

    useEffect(() => {
        if (accessToken) {
            if (["/login", '/register'].includes(pathname)) router.replace("/contacts");
        } else {
            if (!["/login", '/register', '/'].includes(pathname)) router.replace("/login");
        }
        const fetchContact = async () => {
            if (accessToken) {
                try {
                    const contact = await getSingleUserRequest(contactId, accessToken);
                    setContacts(contact);
                    reset();
                    // setValue("firstName", contact.firstName)
                    // setValue("lastName", contact.lastName)
                    // setValue("phoneNumber", contact.phoneNumber)
                } catch (error) {
                    setError("");
                }
            } else {
                setError('No token found.');
                setLogoutAuthState();
                router.push('/login');
            }
        };

        fetchContact();
    }, [isAuthenticated, pathname, accessToken]);

    const onSubmit = async (data: any, event: any) => {
        event.preventDefault();
        if (accessToken) {
            setIsLoading(true);
            try {
                const response = await axios.patch(`http://localhost:4000/api/contacts/?contactId=${contactId}`, data, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const value = await response.data;
                if (value.phoneNumber) {
                    setIsLoading(false)
                    setError('');
                    router.push('/contacts');
                } else {
                    setIsLoading(false)
                    setError('Incorrect Credentials');
                }

            } catch (error: any) {
                // If an error occurs during form submission, set the error message
                setError(error.response.data.message);
            } finally {
                setIsLoading(false)
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
                <input defaultValue={contact?.firstName}
                    {...register('firstName')}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                {errors.firstName && <p className='text-red-200 text-sm font-semi-bold'>{errors.firstName.message}</p>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input defaultValue={contact?.lastName}
                    {...register('lastName')}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                {errors.lastName && <p className='text-red-200 text-sm font-semi-bold'>{errors.lastName.message}</p>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input defaultValue={contact?.phoneNumber}
                    type="tel"
                    {...register('phoneNumber')}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="phoneNumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number <span className="text-orange-500">(08012345689)</span></label>
                {errors.phoneNumber && <p className='text-red-200 text-sm font-semi-bold'>{errors.phoneNumber.message}</p>}
            </div>
            {error && <p className='text-red-200 font-semibold my-3'>{error}</p>}
            <button type="submit" className="flex items-center justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {isLoading && <Spinner />}
                Edit data
            </button>
        </form>
    );
}
