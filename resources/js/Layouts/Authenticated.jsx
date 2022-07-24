import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';


export default function Authenticated({ auth, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className='text-3xl font-bold'>
                                    Koro Koro Family Karaoke
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('jabatan')} active={route().current('jabatan')}>
                            Jabatan
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('karyawan')} active={route().current('karyawan')}>
                            Karyawan
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('absensi')} active={route().current('absensi')}>
                            Data Absesnsi
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('setting.potongan.gaji')} active={route().current('setting.potongan.gaji')}>
                            Setting Potongan Gaji
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('gaji')} active={route().current('gaji')}>
                            Data Gaji
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('slip.gaji')} active={route().current('slip.gaji')}>
                            Slip Gaji
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='flex flex-row md:mt-5 mx-au max-w-7xl mx-auto'>
                <div className='w-auto hidden md:block'>
                    <aside className="w-64" aria-label="Sidebar">
                    <div className="overflow-y-auto py-4 px-3 bg-white rounded dark:bg-gray-800">
                        <ul className="space-y-2">
                            <li>
                                <Link href={route('dashboard')} className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${route().current('dashboard') ? 'bg-gray-100' : 'hover:bg-gray-100'} dark:hover:bg-gray-700`}>
                                <span className="ml-3">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('jabatan')} className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${route().current('jabatan') ? 'bg-gray-100' : 'hover:bg-gray-100'} dark:hover:bg-gray-700`}>
                                <span className="flex-1 ml-3 whitespace-nowrap">Jabatan</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('karyawan')} className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${route().current('karyawan') ? 'bg-gray-100' : 'hover:bg-gray-100'} dark:hover:bg-gray-700`}>
                                <span className="flex-1 ml-3 whitespace-nowrap">Karyawan</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('absensi')} className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${route().current('absensi') ? 'bg-gray-100' : 'hover:bg-gray-100'} dark:hover:bg-gray-700`}>
                                <span className="flex-1 ml-3 whitespace-nowrap">Data Absensi</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('setting.potongan.gaji')} className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${route().current('setting.potongan.gaji') ? 'bg-gray-100' : 'hover:bg-gray-100'} dark:hover:bg-gray-700`}>
                                <span className="flex-1 ml-3 whitespace-nowrap">Setting Potongan Gaji</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('gaji')} className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${route().current('gaji') ? 'bg-gray-100' : 'hover:bg-gray-100'} dark:hover:bg-gray-700`}>
                                <span className="flex-1 ml-3 whitespace-nowrap">Data Gaji</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={route('slip.gaji')} className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ${route().current('slip.gaji') ? 'bg-gray-100' : 'hover:bg-gray-100'} dark:hover:bg-gray-700`}>
                                <span className="flex-1 ml-3 whitespace-nowrap">Slip Gaji</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    </aside>
                </div>

                <div className='w-full pt-5 md:pt-0'>
                    <main>{children}</main>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
