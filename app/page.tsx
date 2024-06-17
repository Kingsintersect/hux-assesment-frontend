import Link from "next/link";


export default function Home() {
    return (
        <>
            <section className="min-h-screen bg-white dark:bg-gray-900">
                <div className="py-8 mt-20 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                    <Link href="/register" className="animate-bounce inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                        <span className="text-xs bg-orange-600 rounded-full text-white px-4 py-1.5 me-3">New</span> <span className="text-sm font-bold">Dive right in</span>
                        <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180 text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </Link>
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Never loose your contact informations</h1>
                    <p className="mb-8 text-lg font-normal text-orange-200 lg:text-xl sm:px-16 lg:px-48 dark:text-orange-200">Here at Hux Ventures, one of our top priorities is to manage your contact informations with our FIRST CLASS WORLD LEADING technology and inovations</p>
                </div>
                <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
            </section>
        </>

    );
}
