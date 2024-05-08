import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditContactForm from "@/app/ui/contacts/EditContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Edit Contact',
};

const EditContactPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id;

    return (
        <main className='max-w-md mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-2xl pt-28'>
            <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className='text-2xl mb-7'>Edite Contact</h1>
                <div className='flex-auto w-full'>
                    <div className='max-w-md mx-auto'>
                        <Breadcrumbs
                            breadcrumbs={[
                                { label: 'contacts', href: '/contacts' },
                                {
                                    label: 'Edit Contact',
                                    href: `/contacts/${id}/edit`,
                                    active: true,
                                },
                            ]}
                        />
                    </div>
                    <EditContactForm contactId={id} />
                </div>
            </div>
        </main>
    )
}

export default EditContactPage
