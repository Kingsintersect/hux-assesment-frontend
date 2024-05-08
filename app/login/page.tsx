import AppLogo from '@/app/ui/app-logo';
import LoginForm from '@/app/ui/forms/LoginForm';
import { Metadata } from 'next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: 'Login',
};

export default function LoginPage() {
    return (
        <section className="max-w-md mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="">
                    <AppLogo />
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    );
}