import React, { useEffect, useRef, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm } from '@inertiajs/inertia-react';
import { useModalState } from '@/Hooks'
import Button from '@/Components/Button';
import FormModal from './FormModal';
import { getDataGaji } from '@/Services/DataGaji';
import { useReactToPrint } from 'react-to-print';
import { formatIDR } from '@/Utils';

const ComponentToPrint = React.forwardRef(({ user, month, year }, ref) => {
    const date = new Date()
    return (
        <div ref={ref} className="p-5 print-only">
            <div className='w-full text-center p-2 flex flex-col justify-center items-center'>
                <p className='font-bold text-3xl'>Koro Koro Family Karaoke</p>
                <p className='text-xl border-b-2 w-2/3'>Slip Gaji Pegawai</p>
            </div>
            <table className='ml-10'>
                <tbody>
                <tr>
                    <td>Nama Karyawan </td>
                    <td>: {user?.name}</td>
                </tr>
                <tr>
                    <td>NIK </td>
                    <td>: {user?.nik}</td>
                </tr>
                <tr>
                    <td>Jabatan </td>
                    <td>: {user?.jabatan}</td>
                </tr>
                <tr>
                    <td>Bulan </td>
                    <td>: {month}</td>
                </tr>
                <tr>
                    <td>Tahun</td>
                    <td>: {year}</td>
                </tr>
                </tbody>
            </table>
            <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-5" border={1}>
                <tbody>
                    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
                        <td className="border px-2 py-2 font-bold">No</td>
                        <td className="border px-2 py-2 font-bold">Keterangan</td>
                        <td className="border px-2 py-2 font-bold">Jumlah</td>
                    </tr>
                    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
                        <td className="border px-2 py-2">1</td>
                        <td className="border px-2 py-2">Gaji Pokok</td>
                        <td className="border px-2 py-2">Rp. {formatIDR(user?.gajiPokok)}</td>
                    </tr>
                    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
                        <td className="border px-2 py-2">2</td>
                        <td className="border px-2 py-2">Tunjangan Jabatan</td>
                        <td className="border px-2 py-2">Rp. {formatIDR(user?.tunjangan)}</td>
                    </tr>
                    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
                        <td className="border px-2 py-2">3</td>
                        <td className="border px-2 py-2">Fee Penjualan</td>
                        <td className="border px-2 py-2">Rp. {formatIDR(user?.feePenjualan)}</td>
                    </tr>
                    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
                        <td className="border px-2 py-2">4</td>
                        <td className="border px-2 py-2">Tunjangan Transaportasi</td>
                        <td className="border px-2 py-2">Rp. {formatIDR(user?.transport)}</td>
                    </tr>
                    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
                        <td className="border px-2 py-2">5</td>
                        <td className="border px-2 py-2">Uang Makan</td>
                        <td className="border px-2 py-2">Rp. {formatIDR(user?.uangMakan)}</td>
                    </tr>
                    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
                        <td className="border px-2 py-2">6</td>
                        <td className="border px-2 py-2">Bonus</td>
                        <td className="border px-2 py-2">Rp. {formatIDR(user?.bonus)}</td>
                    </tr>
                    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
                        <td className="border px-2 py-2">7</td>
                        <td className="border px-2 py-2">Potongan</td>
                        <td className="border px-2 py-2">Rp. {formatIDR(user?.potongan)}</td>
                    </tr>
                    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
                        <td colSpan={2} className="text-right font-bold">Total Gaji</td>
                        <td className="border px-2 py-2">Rp. {formatIDR(user?.total)}</td>
                    </tr>
                </tbody>
            </table>
            <div className='flex justify-between mt-5 mr-5'>
                <div className='flex flex-col ml-10'>
                    <p>Pegawai</p>
                    <div className='mt-20'>{user?.name}</div>
                </div>
                <div className='flex flex-col'>
                    <p>Pekanbaru,  {date.getDate()}-{date.getMonth()}-{date.getFullYear()}</p>
                    <p>Finance</p>
                    <div className='border-black border-2 mt-20'/>
                </div>
            </div>
        </div>
    )
})

export default function Gaji(props) {
    const formModal = useModalState(false)
    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const month = (new Date()).getMonth()
    const year = (new Date()).getFullYear()
    const months = [1,2,3,4,5,6,7,8,9,10,11,12]
    const years = [+year-2, +year-1, year, +year+1, +year+2]

    const {data, setData} = useForm({
        month: month,
        year: year,
        userId: '',
    })
    console.log(data.userId)
    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    const [items, setItems] = useState([])
    const user = items.find(item => item.id == data.userId)

    useEffect(() => {
        getDataGaji(`${data.month}_${data.year}`,  setItems)
    }, [data])

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Slip Gaji" />

            <div className="py-0">
                <div className="max-w-3xl xl:max-w-7xl w-full sm:px-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className='mb-5 text-3xl font-semibold'>
                                Slip Gaji
                            </div>
                            <div className='flex flex-col space-y-2 justify-center'>
                                <div className='flex flex-row items-center space-x-2'>
                                    <label>Bulan</label>
                                    <select className='select' value={data.month} name="month" onChange={onHandleChange}>
                                        <option value="">Bulan</option>
                                        {months.map(month => (
                                            <option key={month}>{month}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex flex-row items-center space-x-2'>
                                    <label>Tahun</label>
                                    <select className='select'  value={data.year} name="year" onChange={onHandleChange}>
                                        <option>Tahun</option>
                                        {years.map(year => (
                                            <option key={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex flex-row items-center space-x-2'>
                                    <label>Karyawan</label>
                                    <select className='select' value={data.userId} name="userId" onChange={onHandleChange}>
                                        <option value="">Karyawan</option>
                                        {items.map(em => (
                                            <option key={em.id} value={em.id}>{em.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Button onClick={handlePrint}>Cetak</Button>
                                </div>
                            </div>
                            <ComponentToPrint ref={componentRef} user={user} month={data.month} year={data.year}/>
                        </div>
                    </div>
                </div>
            </div>
            <FormModal modalState={formModal} periode={`${data.month}_${data.year}`}/>
        </Authenticated>
    );
}
