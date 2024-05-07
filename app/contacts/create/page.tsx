import Breadcrumbs from '@/app/ui/breadcrumbs'
import CreateContactForm from '@/app/ui/contacts/CreateContactForm'
import React from 'react'

const page = () => {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Contacts', href: '/dashboard/contacts' },
                    {
                        label: 'Create Contact',
                        href: '/contacts/create',
                        active: true,
                    },
                ]}
            />
            <CreateContactForm />
        </main>
    )
}

export default page