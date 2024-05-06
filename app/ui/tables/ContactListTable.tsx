'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Search from '../contacts/Search';
import { CreateContact, DeleteContact, UpdateContact, } from '../contacts/buttons';
import { lusitana } from '../fonts';
import { CheckLogin } from '@/app/actions/action';


const ContactListTable = () => {
    const api = 'http://localhost:4000/api/contacts/6638b67f5155c9c0ac408353'
    CheckLogin()

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }

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
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Apple MacBook Pro 17"
                                </th>
                                <td className="px-6 py-4">
                                    Silver
                                </td>
                                <td className="px-6 py-4">
                                    Laptop
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="id-131131dcwew/edit" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</a>
                                    <a href="id-31878637oihc" className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Microsoft Surface Pro
                                </th>
                                <td className="px-6 py-4">
                                    White
                                </td>
                                <td className="px-6 py-4">
                                    Laptop PC
                                </td>
                                <td className="flex justify-center items-center gap-5 pt-2">
                                    <UpdateContact id={`${"123456789"}`} />
                                    <DeleteContact id={`${"123456789"}`} />
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Magic Mouse 2
                                </th>
                                <td className="px-6 py-4">
                                    Black
                                </td>
                                <td className="px-6 py-4">
                                    Accessories
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="id-131131dcwew/edit" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</a>
                                    <a href="id-31878637oihc" className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default ContactListTable