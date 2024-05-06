import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditContactForm from "@/app/ui/contacts/EditForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Edit Contact',
};

const EditContactPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'contacts', href: '/contacts' },
                    {
                        label: 'Edit Contact',
                        href: `/contacts/${"id"}/edit`,
                        active: true,
                    },
                ]}
            />
            <EditContactForm contact={"invoice"} customers={[]} />
        </main>
    )
}

export default EditContactPage
