import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';

export default function Jabatan(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Jabatan" />

            <div className="py-0">
                <div className="max-w-7xl sm:px-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Button>Tambah</Button>
                            <div className="overflow-x-auto relative pt-5">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">
                                                Product name
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Color
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Category
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Apple MacBook Pro 17"
                                            </th>
                                            <td className="py-4 px-6">
                                                Sliver
                                            </td>
                                            <td className="py-4 px-6">
                                                Laptop
                                            </td>
                                            <td className="py-4 px-6">
                                                $2999
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Microsoft Surface Pro
                                            </th>
                                            <td className="py-4 px-6">
                                                White
                                            </td>
                                            <td className="py-4 px-6">
                                                Laptop PC
                                            </td>
                                            <td className="py-4 px-6">
                                                $1999
                                            </td>
                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800">
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Magic Mouse 2
                                            </th>
                                            <td className="py-4 px-6">
                                                Black
                                            </td>
                                            <td className="py-4 px-6">
                                                Accessories
                                            </td>
                                            <td className="py-4 px-6">
                                                $99
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
