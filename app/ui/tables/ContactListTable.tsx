'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Search from '../contacts/Search';
import { CreateContact, DeleteContact, UpdateContact, } from '../contacts/buttons';
import { lusitana } from '../fonts';
import { CheckLogin } from '@/app/actions/action';
import { useAccessToken } from '@/app/actions/accessTokenContext';
import axios from 'axios';

type Contacts = {
    _id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
}
const ContactListTable = () => {
    const [contacts, setContacts] = useState<Contacts[] | null>();
    const { accessToken, setAccessToken } = useAccessToken();
    // const [pageStatus, setpageStatus] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchContacts = async () => {
            console.log(accessToken, "heree")
            try {
                const response = await axios.get('http://localhost:4000/api/contacts', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (response.status >= 200 && response.status < 300) {
                    console.log('Response data:', response.data);
                    setContacts(response.data);
                } else {
                    setError("Request failed")
                    console.error('Request failed with status code:', response.status);
                }
            } catch (error) {
                console.error('Error fetching contacts:', error);
                setError('Token is invalid. Please log in again.');
                // Redirect to login page
                setTimeout(() => {
                    // router.push('/login');
                }, 1000);
            }
        };

        // if (accessToken) {
        fetchContacts();
        // }
    }, [router, accessToken]);


    return (
        <div className='py-20'>
            <header className='text-center'>
                <h1 className={`${lusitana.className} text-2xl mb-3`}>Lists Of Your Contacts</h1>
                <p>This route is ContactsPage. Only accessible when logged in.</p>
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
                                        <UpdateContact id={`${"123456789"}`} />
                                        <DeleteContact id={`${"123456789"}`} />
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