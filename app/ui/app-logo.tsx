import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AppLogo() {
    return (
        <div
            className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
        >
            <a href="/" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                <GlobeAltIcon className="h-12 w-12 rotate-[15deg] text-blue-500 mr-3" />
                HUX
            </a>
        </div>
    );
}
