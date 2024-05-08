import { PencilIcon, PlusIcon, TrashIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateContact() {
    return (
        <Link
            href="/contacts/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Create Contact</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function ViewContact({ id }: { id: string }) {
    return (
        <Link
            href={`/contacts/${id}/details`} className="rounded-md border p-1 border-yellow-400 text-yellow-400 hover:bg-gray-100"
        >
            <DocumentMagnifyingGlassIcon className="w-5" />
        </Link>
    );
}

export function UpdateContact({ id }: { id: string }) {
    return (
        <Link
            href={`/contacts/${id}/edit`} className="rounded-md border border-blue-600  text-blue-600  p-1 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

interface DeleteContactProps {
    isLoading: boolean;
    handleDelete: (id: string) => void;
    id: string;
    defaultType?: 'default' | 'big';
}
export const DeleteContact: React.FC<DeleteContactProps> = ({ isLoading, handleDelete, id, defaultType = 'default' }) => {
    return (
        <>
            {defaultType === 'default' ? (
                <button onClick={() => handleDelete(id)} disabled={isLoading} className="rounded-md border border-red-500 p-1 hover:bg-gray-100">
                    <span className="sr-only">Delete</span>
                    <TrashIcon className="w-5 text-red-500" />
                </button>
            ) : (
                <a onClick={() => handleDelete(id)} href="#" className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete Contact ?</a>
            )}
        </>
    )
}
