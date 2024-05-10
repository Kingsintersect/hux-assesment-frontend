import { Suspense } from "react";
import ContactListTable from "../ui/tables/ContactListTable";
import { CardSkeleton } from "../ui/Skeletons";


const ContactsPage = () => {
    return (
        <>
            <section className="sm:max-w-xl md:max-w-2xl mx-auto mt-32 mb-10 lg:max-w-4xl">
                <div className="mx-5">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto rounded-2xl shadow-sm shadow-orange-400">
                        <div className="w-full py-20 px-10">
                            <Suspense key={'query' + 'currentPage'} fallback={<CardSkeleton />}>
                                <ContactListTable />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactsPage;
