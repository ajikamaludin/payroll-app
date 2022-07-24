import React, { useRef, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm } from '@inertiajs/inertia-react';
import { useModalState } from '@/Hooks'
import Button from '@/Components/Button';
import FormModal from './FormModal';
import { getDataGaji } from '@/Services/DataGaji';
import { useReactToPrint } from 'react-to-print';
import { formatIDR } from '@/Utils';

const ComponentToPrint = React.forwardRef(({ items, month, year }, ref) => {
    const date = new Date()
    return (
        <div ref={ref} className="p-5 print-only">
            <div className='w-full text-center p-2'>
                <p className='font-bold text-3xl'>Koro Koro Family Karaoke</p>
                <p className='text-xl'>Periode Gaji Bulan {month} Tahun {year}</p>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5 block whitespace-nowrap">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            NIK
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Nama
                        </th>
                        <th>
                            Jabatan
                        </th>
                        <th scope="col" className='px-2'>
                            Gaji Pokok
                        </th>
                        <th scope="col" className='px-2'>
                            Tunjangan
                        </th>
                        <th scope="col" className='px-2'>
                            Fee Penjualan
                        </th>
                        <th scope="col" className='px-2'>
                            Uang Transport
                        </th>
                        <th scope="col" className='px-2'>
                            Uang Makan
                        </th>
                        <th scope="col" className='px-2'>
                            Bonus
                        </th>
                        <th scope="col" className='px-2'>
                            Potongan
                        </th>
                        <th scope="col" className='px-2'>
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.nik}
                            </th>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.jabatan}
                            </td>
                            <td>
                                Rp. {formatIDR(item.gajiPokok)}
                            </td>
                            <td>
                                Rp. {formatIDR(item.tunjangan)}
                            </td>
                            <td>
                                Rp. {formatIDR(item.feePenjualan)}
                            </td>
                            <td>
                                Rp. {formatIDR(item.transport)}
                            </td>
                            <td>
                                Rp. {formatIDR(item.uangMakan)}
                            </td>
                            <td>
                                Rp. {formatIDR(item.bonus)}
                            </td>
                            <td>
                                Rp. {formatIDR(item.potongan)}
                            </td>
                            <td>
                                Rp. {formatIDR(item.total)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-end mt-5 mr-5'>
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

    const [items, setItems] = useState([])
    const onClickShow = () => {
        getDataGaji(`${data.month}_${data.year}`,  setItems)
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Data Gaji" />

            <div className="py-0">
                <div className="max-w-3xl xl:max-w-7xl w-full sm:px-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className='mb-5 text-3xl font-semibold'>
                                Data Gaji
                            </div>
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
                                </div>
                            </div>
                            <ComponentToPrint ref={componentRef} items={items} month={data.month} year={data.year}/>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5 block overflow-x-auto whitespace-nowrap">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="py-3 px-6">
                                            NIK
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Nama
                                        </th>
                                        <th>
                                            Jabatan
                                        </th>
                                        <th scope="col" className='px-2'>
                                            Gaji Pokok
                                        </th>
                                        <th scope="col" className='px-2'>
                                            Tunjangan
                                        </th>
                                        <th scope="col" className='px-2'>
                                            Fee Penjualan
                                        </th>
                                        <th scope="col" className='px-2'>
                                            Uang Transport
                                        </th>
                                        <th scope="col" className='px-2'>
                                            Uang Makan
                                        </th>
                                        <th scope="col" className='px-2'>
                                            Bonus
                                        </th>
                                        <th scope="col" className='px-2'>
                                            Potongan
                                        </th>
                                        <th scope="col" className='px-2'>
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.nik}
                                            </th>
                                            <td className="py-4 px-6">
                                                {item.name}
                                            </td>
                                            <td className="py-4 px-6">
                                                {item.jabatan}
                                            </td>
                                            <td>
                                                Rp. {formatIDR(item.gajiPokok)}
                                            </td>
                                            <td>
                                                Rp. {formatIDR(item.tunjangan)}
                                            </td>
                                            <td>
                                                Rp. {formatIDR(item.feePenjualan)}
                                            </td>
                                            <td>
                                                Rp. {formatIDR(item.transport)}
                                            </td>
                                            <td>
                                                Rp. {formatIDR(item.uangMakan)}
                                            </td>
                                            <td>
                                                Rp. {formatIDR(item.bonus)}
                                            </td>
                                            <td>
                                                Rp. {formatIDR(item.potongan)}
                                            </td>
                                            <td>
                                                Rp. {formatIDR(item.total)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {items.length > 0 && (
                                <div className='flex justify-end'>
                                    <Button onClick={handlePrint} className="mt-2">Cetak</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <FormModal modalState={formModal} periode={`${data.month}_${data.year}`}/>
        </Authenticated>
    );
}
