import { Suspense } from "react";
import ContactListTable from "../ui/tables/ContactListTable";
import { CardSkeleton } from "../ui/Skeletons";


const ContactsPage = () => {
    return (
        <>
            <section className="max-w-md mx-auto md:max-w-2xl mt-24">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 rounded-2xl shadow-sm shadow-orange-400">
                    <div className="py-20">
                        <Suspense key={'query' + 'currentPage'} fallback={<CardSkeleton />}>
                            <ContactListTable />
                        </Suspense>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactsPage;
