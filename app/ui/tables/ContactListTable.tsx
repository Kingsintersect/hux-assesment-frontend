'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Search from '../contacts/Search';
import { CreateContact, DeleteContact, UpdateContact, } from '../contacts/buttons';
import { lusitana } from '../fonts';
import { useAccessToken } from '@/app/actions/accessTokenContext';
import axios from 'axios';
import { Contact } from '@/app/actions/Types';
import { deleteContactRequest } from '@/app/actions/action';
import { deleteToken, getToken } from '@/app/actions/auth';


const ContactListTable = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const { accessToken, setAccessToken } = useAccessToken();
    const [error, setError] = useState('');
    const router = useRouter();

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
                        setContacts(response.data); console.log(response.data)
                    } else {
                        setError(response.data.message)
                    }
                } catch (error) {
                    setError('Token is invalid. Please log in again.');
                    router.push('/login');
                }
            } else {
                setError('No token found.');
            }

        };

        fetchContacts();
    }, [accessToken]);

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
        <div className='py-20'>
            <header className='text-center'>
                <h1 className={`${lusitana.className} text-2xl mb-3`}>Lists Of Your Contacts</h1>
                <p>This route is ContactsPage. Only accessible when logged in.</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </header>

            <div className='overflow-hidden mt-10'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className='flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 mb-5'>
                        <CreateContact />
                        <Search />
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
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
                                <tr key={contact._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {contact.firstName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {contact.lastName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {contact.phoneNumber}
                                    </td>
                                    <td className="flex justify-center items-center gap-5 pt-2">
                                        <UpdateContact id={contact._id} />
                                        <DeleteContact isLoading={isLoading} handleDelete={handleDelete} id={contact._id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default ContactListTable