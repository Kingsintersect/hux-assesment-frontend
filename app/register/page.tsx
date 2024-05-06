import AppLogo from '@/app/ui/app-logo';
import { Metadata } from 'next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import RegisterForm from '../ui/forms/RegisterForm';

export const metadata: Metadata = {
    title: 'Register',
};

export default function RegisterPage() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-10">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="">
                    <AppLogo />
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </section>
    );
}