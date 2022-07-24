import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { useModalState } from '@/Hooks'
import Button from '@/Components/Button';
import FormModal from './FormModal';
import { getAll, deleteById } from '@/Services/Karyawan';
import { toast } from 'react-toastify';

export default function Karyawan(props) {
    const formModal = useModalState(false)
    const [items, setItems] = useState([])

    const hanldeDeleteClick = (item) => {
        const con = confirm("delete item?")
        if (con) {
            deleteById(item.id)
            .then(() => toast.success('berhasil hapus'))
            .finally(() => fetchData())
        }
    }

    const handleEditClick = (item) => {
        formModal.setData(item)
        formModal.toggle()
    }

    const fetchData = () => {
        getAll()
        .then(items => setItems(items))
    }

    useEffect(() => {
        fetchData()
    }, [])

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
                            <Button onClick={formModal.toggle}>Tambah</Button>
                            <div className="overflow-x-auto relative pt-5">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">
                                                Nama
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Jabatan
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(item => (
                                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {item.data.name}
                                                </th>
                                                <td className="py-4 px-6">
                                                    {item.data.jabatan.nama}
                                                </td>
                                                <th>
                                                    <div className='flex space-x-1'> 
                                                    <Button onClick={() => handleEditClick(item)}>Edit</Button>
                                                    {item.data.jabatan.id != "1" && (
                                                        <Button onClick={() => hanldeDeleteClick(item)}>Hapus</Button>
                                                    )}
                                                    </div>
                                                </th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FormModal modalState={formModal} refresh={fetchData}/>
        </Authenticated>
    );
}
