import { Suspense } from "react";
import ContactListTable from "../ui/tables/ContactListTable";
import { InvoicesTableSkeleton } from "../ui/skeletons";


const ContactsPage = () => {
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Suspense key={'query' + 'currentPage'} fallback={<InvoicesTableSkeleton />}>
                        <ContactListTable />
                    </Suspense>
                </div>
            </section>
        </>
    );
};

export default ContactsPage;
