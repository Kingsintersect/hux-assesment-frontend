import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditContactForm from "@/app/ui/contacts/EditContactForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Edit Contact',
};

const EditContactPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id;

    return (
        <main className='max-w-md mx-auto md:max-w-2xl mt-24'>
            <div className="mx-5">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto rounded-2xl shadow-sm shadow-orange-400">
                    <div className="w-full py-20 px-10">
                        <h1 className='text-2xl mb-7 text-orange-300'>Edit Contact</h1>
                        <div className='flex-auto w-full'>
                            <div className='max-w-md mx-auto'>
                                <Breadcrumbs
                                    breadcrumbs={[
                                        { label: 'Contacts', href: '/contacts' },
                                        {
                                            label: 'Edit Contact',
                                            href: `/contacts/${id}/edit`,
                                            active: true,
                                        },
                                    ]}
                                />
                            </div>
                            <Suspense key={'query' + 'currentPage'} fallback={<div>Loading...</div>}>
                                <EditContactForm contactId={id} /></Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default EditContactPage
