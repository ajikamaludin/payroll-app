import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Modal } from '@/Components/Modal'
import { useForm } from '@inertiajs/inertia-react'
import Button from '@/Components/Button'
import Input from '@/Components/Input'
import { getAll } from '@/Services/Karyawan'
import { create } from '@/Services/Absensi'

export default function FormModal({ modalState, periode, refresh }) {
    const [loading, setLoading] = useState(false)
    const { data, setData,  reset } = useForm({
        users: []
    })

    useEffect(() => {
        getAll()
        .then(items => setData({
            users: items.filter(item => item.data.jabatan.id != "1").map(item => {
                return {
                    id: item.id,
                    name: item.data.name,
                    nik: item.data.nik,
                    jenisKelamin: item.data.jenisKelamin,
                    jabatan: item.data.jabatan.nama,
                    jabatan_id: item.data.jabatan.id,
                    hadir: 0,
                    sakit: 0,
                    alfa: 0,
                }
            })
        }))
    },[modalState])

    const onHandleChange = (item, event) => {
        setData({
            users: data.users.map(user => {
                if (user.id == item.id) {
                    user[event.target.name] = event.target.value
                }
                return user
            })
        })
    }

    const submit = (e) => {
        e.preventDefault()
        setLoading(true)
        create({
            ...data,
            periode: periode,
        })
        .then(() => {
            reset()
            modalState.toggle()
        })
        .finally(() => setLoading(false))
    }

    return (
        <Modal isOpen={modalState.isOpen} toggleModal={modalState.toggle} size="4xl">
            <div className="text-lg font-bold">Absensi Karyawan</div>
            <div className="text-md">Periode : {periode}</div>
            <div className="overflow-x-auto relative pt-5">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                NIK
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Nama
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Jenis Kelamin
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Jabatan
                            </th>
                            <th scope="col" className="py-3 px-6">Hadir</th>
                            <th scope="col" className="py-3 px-6">Sakit</th>
                            <th scope="col" className="py-3 px-6">Alfa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.users.map(item => (
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.nik}
                                </th>
                                <td className="py-4 px-6">
                                    {item.name}
                                </td>
                                <td className="py-4 px-6">
                                    {item.jenisKelamin}
                                </td>
                                <td className="py-4 px-6">
                                    {item.jabatan}
                                </td>
                                <td>
                                    <Input 
                                        name="hadir" 
                                        value={item.hadir} 
                                        handleChange={(e) => onHandleChange(item, e)}/>
                                </td>
                                <td>
                                    <Input
                                        name="sakit" 
                                        value={item.sakit}
                                        handleChange={(e) => onHandleChange(item, e)}/>
                                </td>
                                <td>
                                    <Input 
                                        name="alfa" 
                                        value={item.alfa}
                                        handleChange={(e) => onHandleChange(item, e)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button className={'mt-4'} onClick={submit} disabled={loading} processing={loading}>
                Save
            </Button>
        </Modal>
    )
}