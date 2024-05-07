import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditContactForm from "@/app/ui/contacts/EditContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Edit Contact',
};

const EditContactPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id;

    return (
        <main>
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
            <EditContactForm contactId={id} />
        </main>
    )
}

export default EditContactPage
