'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateContact, DeleteContact, UpdateContact, ViewContact, } from '../contacts/buttons';
import { lusitana } from '../fonts';
import axios from 'axios';
import { Contact } from '@/app/actions/Types';
import { deleteContactRequest } from '@/app/actions/action';
import { getToken } from '@/app/actions/auth';
import { useAuth } from '@/app/actions/AuthContext';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const ContactListTable = () => {
    const { isAuthenticated, setLogoutAuthState } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [error, setError] = useState('');
    const router = useRouter();
    const accessToken = getToken();

    useEffect(() => {
        const fetchContacts = async () => {
            if (accessToken) {
                try {
                    const response = await axios.get('http://localhost:4000/api/contacts', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    if (response.status >= 200 && response.status < 300) {
                        setError('');
                        if (response.data.length < 1) { setError("You don't have any record yet !"); }
                        else { setContacts(response.data); }
                    } else {
                        setError(response.data.message)
                    }
                } catch (error) {
                    setError('Token is invalid. Please log in again.');
                }
            } else {
                setError('No token found.');
                setLogoutAuthState();
                router.push('/login');
            }

        };

        fetchContacts();
    }, [isAuthenticated, accessToken]);

    const handleDelete = async (id: string) => {
        setIsLoading(true);
        try {
            const accessToken = getToken();
            if (!accessToken) throw new Error("Access token not found!")
            const result = await deleteContactRequest(id, accessToken);
            if (result.success) setError(''), setContacts(prevContacts => prevContacts.filter(contact => contact._id !== id));
        } catch (error) {
            setError("Internal Server Problem")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className='space-y-4 md:space-y-6'>
                <header className='text-center'>
                    <h1 className={`${lusitana.className} text-2xl mb-3 text-orange-300`}>Lists Of Your Contacts</h1>
                    <p className='text-orange-100'>Manage your contact informations.</p>
                    {error && <p className='text-red-400 mt-5'>{error}</p>}
                </header>

                <div className='overflow-hidden'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div className='flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 mb-5'>
                            <CreateContact />
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Photo
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        First Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Last Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts?.map((contact) => (
                                    // <Link href={`/contacts/${contact._id}/details`} className='unset inline'>
                                    <tr key={contact._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                        <th scope="row" className="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <UserCircleIcon />
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {contact.firstName}
                                        </th>
                                        <td className="px-6 py-4">
                                            {contact.lastName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {contact.phoneNumber}
                                        </td>
                                        <td className="flex justify-center items-center gap-5 pt-2 px-6">
                                            <ViewContact id={contact._id} />
                                            <UpdateContact id={contact._id} />
                                            <DeleteContact isLoading={isLoading} handleDelete={handleDelete} id={contact._id} />
                                        </td>
                                    </tr>
                                    // </Link>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >

        </>


    )
}

export default ContactListTable