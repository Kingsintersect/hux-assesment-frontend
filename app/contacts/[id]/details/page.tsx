import Breadcrumbs from '@/app/ui/breadcrumbs'
import ContactView from '@/app/ui/contacts/ContactView'
import React, { Suspense } from 'react'

const ContactDetailsPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    return (
        <main className='max-w-md mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-2xl pt-28'>
            <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className='text-2xl mb-7'>Contact Details</h1>
                <div className='flex-auto w-full max-w-md mx-auto'>
                    <div className=''>
                        <Breadcrumbs
                            breadcrumbs={[
                                { label: 'Contacts', href: '/contacts' },
                                {
                                    label: 'Create Contact',
                                    href: `/contacts/${id}/details`,
                                    active: true,
                                },
                            ]}
                        />
                    </div>
                    <Suspense key={'query' + 'currentPage'} fallback={<div>Loading</div>}>
                        <ContactView contactId={id} />
                    </Suspense>
                </div>
            </div>
        </main>
    )
}

export default ContactDetailsPage