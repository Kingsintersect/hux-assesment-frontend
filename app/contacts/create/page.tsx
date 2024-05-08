import Breadcrumbs from '@/app/ui/breadcrumbs'
import CreateContactForm from '@/app/ui/contacts/CreateContactForm'
import React from 'react'

const page = () => {
    return (
        <main className='max-w-md mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-2xl pt-28'>
            <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className='text-2xl mb-7'>Create New Contact</h1>
                <div className='flex-auto w-full'>
                    <div className='max-w-md mx-auto'>
                        <Breadcrumbs
                            breadcrumbs={[
                                { label: 'Contacts', href: '/contacts' },
                                {
                                    label: 'Create Contact',
                                    href: '/contacts/create',
                                    active: true,
                                },
                            ]}
                        />
                    </div>
                    <CreateContactForm />
                </div>
            </div>
        </main>
    )
}

export default page