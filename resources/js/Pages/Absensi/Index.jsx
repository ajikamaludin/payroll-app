import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm } from '@inertiajs/inertia-react';
import { useModalState } from '@/Hooks'
import Button from '@/Components/Button';
import FormModal from './FormModal';
import { getByPeriode } from '@/Services/Absensi';
import { toast } from 'react-toastify';

export default function Karyawan(props) {
    const formModal = useModalState(false)
    
    const month = (new Date()).getMonth()
    const year = (new Date()).getFullYear()
    const months = [1,2,3,4,5,6,7,8,9,10,11,12]
    const years = [+year-2, +year-1, year, +year+1, +year+2]

    const {data, setData} = useForm({
        month: month,
        year: year
    })

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    const [absensi, setAbsensi] = useState({})
    const onClickShow = () => {
        setAbsensi({})
        getByPeriode(`${data.month}_${data.year}`)
        .then(items => {
            if(items.length <= 0) {
                toast.error("No data found")
                return
            }
            setAbsensi(items[0])
        })
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Absensi" />

            <div className="py-0">
                <div className="max-w-7xl sm:px-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className='flex flex-col md:flex-row space-y-1 md:space-y-0 justify-between'>
                                <div className='flex space-x-1 items-center'>
                                    <p>Periode Data :</p>
                                    <select className='select' value={data.month} name="month" onChange={onHandleChange}>
                                        <option value="">Bulan</option>
                                        {months.map(month => (
                                            <option key={month}>{month}</option>
                                        ))}
                                    </select>
                                    <select className='select'  value={data.year} name="year" onChange={onHandleChange}>
                                        <option>Tahun</option>
                                        {years.map(year => (
                                            <option key={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex space-x-1'>
                                    <Button onClick={onClickShow}>Tampilkan Data</Button>
                                    <Button onClick={formModal.toggle}>Tambah Absensi</Button>
                                </div>
                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
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
                                    {absensi.data?.users?.map(item => (
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
                                                {item.hadir} 
                                            </td>
                                            <td>
                                                {item.sakit}
                                            </td>
                                            <td>
                                                {item.alfa}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <FormModal modalState={formModal} periode={`${data.month}_${data.year}`}/>
        </Authenticated>
    );
}
