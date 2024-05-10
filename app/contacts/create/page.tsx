import Breadcrumbs from '@/app/ui/breadcrumbs'
import CreateContactForm from '@/app/ui/contacts/CreateContactForm'
import React from 'react'

const page = () => {
    return (
        <main className='max-w-md mx-auto md:max-w-2xl sm:max-w-xl mt-32'>
            <div className="mx-5">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto rounded-2xl shadow-sm shadow-orange-400">
                    <div className="w-full py-20 px-10">
                        <h1 className='text-2xl mb-7 text-orange-300'>Create New Contact</h1>
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
                </div>
            </div>
        </main>
    )
}

export default page