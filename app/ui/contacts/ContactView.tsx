'use client';
import { Contact } from '@/app/actions/Types';
import { deleteContactRequest, getSingleUserRequest } from '@/app/actions/action';
import React, { useEffect, useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { DeleteContact } from './buttons';
import { getToken } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/actions/AuthContext';

const ContactInitialState = {
    _id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
}
const ContactView = ({ contactId }: { contactId: string; }) => {
    const { isAuthenticated, setLogoutAuthState } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [contact, setContacts] = useState<Contact>(ContactInitialState);
    const [error, setError] = useState('');
    const router = useRouter();
    const accessToken = getToken();


    useEffect(() => {
        const fetchContact = async () => {
            if (accessToken) {
                try {
                    const contact = await getSingleUserRequest(contactId, accessToken);
                    setContacts(contact)
                } catch (error) {
                    setError("");
                    console.error('Error fetching contact:', error);
                }
            } else {
                setError('No token found.');
                setLogoutAuthState();
                router.push('/login');
            }
        };

        fetchContact();
    }, [isAuthenticated, accessToken]);

    const handleDelete = async (id: string) => {
        setIsLoading(true);
        try {
            const accessToken = getToken();
            if (!accessToken) throw new Error("Access token not found!")
            const result = await deleteContactRequest(id, accessToken);
            router.push("/contacts")
        } catch (error) {
            setError("Internal Server Problem")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-5">
                <div className="flex flex-col items-center pb-10">
                    <UserCircleIcon className="w-24 h-24 mb-3 rounded-full shadow-lg" />

                    <h5 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">{contact?.firstName + " " + contact?.lastName}</h5>

                    <span className="text-sm text-gray-500 dark:text-gray-400">{contact?.phoneNumber}</span>

                    <div className="flex mt- md:mt-10">
                        {contact!._id && <DeleteContact isLoading={isLoading} handleDelete={handleDelete} id={contact._id} defaultType='big' />}
                        {/* <a href="#" className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete Contact ?</a> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactView