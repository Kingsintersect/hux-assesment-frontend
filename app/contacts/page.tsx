import { Suspense } from "react";
import ContactListTable from "../ui/tables/ContactListTable";


const ContactsPage = () => {
    return (
        <>
            <section className="max-w-md mx-auto md:max-w-2xl sm:max-w-xl mt-24">
                <div className="mx-5">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto rounded-2xl shadow-sm shadow-orange-400">
                        <div className="w-full py-20 px-10">
                            <Suspense key={'query' + 'currentPage'} fallback={<div>Loading...</div>}>
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
