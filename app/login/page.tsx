import LoginForm from '@/app/ui/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
};

export default function LoginPage() {
    return (
        <section className="max-w-md mx-auto md:max-w-2xl mt-24">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-orange-100 md:text-2xl dark:text-orange-100">
                            Sign in to your account
                        </h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    );
}