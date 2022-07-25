import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 px-5">
            <div className='mt-48 md:mt-0'>
                <Link href="/" className='text-3xl font-bold'>
                    Koro Koro Family Karaoke
                </Link>
            </div>

            <div className="w-full sm:max-w-md md:mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
