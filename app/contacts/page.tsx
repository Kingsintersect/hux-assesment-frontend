import { Suspense } from "react";
import ContactListTable from "../ui/tables/ContactListTable";


const ContactsPage = () => {
    return (
        <>
            <section className="max-w-md mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-24">
                <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Suspense key={'query' + 'currentPage'} fallback={<div>Loading</div>}>
                        <ContactListTable />
                    </Suspense>
                </div>
            </section>
        </>
    );
};

export default ContactsPage;
