import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { asset } from '@/Utils';

export default function Dashboard(props) {
    const user = props.auth.user

    const created_at = new Date(user.created_at.seconds*1000)
    const tglMasuk = `${created_at.getDate()}-${created_at.getMonth()}-${created_at.getFullYear()}`

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Dashboard" />

            <div className="py-0">
                <div className="max-w-7xl sm:px-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">Hai, {user.name}</div>
                    </div>
                    {props.auth.user.name != 'admin' ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-1">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <p className='font-bold'>Data Pegawai</p>
                                <div className='flex flex-col md:flex-row space-x-1'>
                                    <div className='w-full md:w-1/3'>
                                        <img src={`${asset(user.profile)}`} />
                                    </div>
                                    <div>
                                        <table className='w-full text-left text-gray-500 dark:text-gray-400'>
                                            <tbody>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className='px-6 py-4 font-bold'>Nama</td>
                                                    <td className='px-6 py-4'>{user.name}</td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className='px-6 py-4 font-bold'>Jenis Kelamin</td>
                                                    <td className='px-6 py-4'>{user.jenisKelamin}</td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className='px-6 py-4 font-bold'>Jabatan</td>
                                                    <td className='px-6 py-4'>{user.jabatan}</td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className='px-6 py-4 font-bold'>Tanggal Masuk</td>
                                                    <td className='px-6 py-4'>{tglMasuk}</td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className='px-6 py-4 font-bold'>Status</td>
                                                    <td className='px-6 py-4'>{user.status}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    
                </div>
            </div>
        </Authenticated>
    );
}
