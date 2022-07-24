import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Modal } from '@/Components/Modal'
import { useForm } from '@inertiajs/inertia-react'
import Button from '@/Components/Button'
import Input from '@/Components/Input'
import { create, update } from '@/Services/Jabatan'

export default function FormModal({ modalState, refresh }) {
    const [loading, setLoading] = useState(false)
    const { data, setData,  reset } = useForm({
        nama: '',
        gajiPokok: 0,
        tunjangan: 0,
        feePenjualan: 0,
        transport: 0,
        uangMakan: 0,
        bonus: 0,
        total: 0
    })

    const total = +data.gajiPokok + +data.tunjangan + +data.feePenjualan + +data.transport + +data.uangMakan + +data.bonus

    useEffect(() => {
        setData({
            ...data,
            total: total
        })
    }, [total])

    useEffect(() => {
        if (modalState.isOpen === false) {
            reset()
            modalState.setData(null)
        }
        if (modalState.data !== null) {
            setData(modalState.data.data)
        }
    }, [modalState])

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    const submit = (e) => {
        e.preventDefault()
        setLoading(true)
        if (modalState.data !== null) {
            update(data, modalState.data.id)
            .finally(() => {
                reset()
                toast.success("berhasil update")
                setLoading(false)
                modalState.toggle()
                refresh()
            })
        } else {
            create(data)
            .then((id) => console.log(id))
            .finally(() => {
                reset()
                toast.success("berhasil simpan")
                setLoading(false)
                modalState.toggle()
                refresh()
            })
        }
    }

    return (
        <Modal isOpen={modalState.isOpen} toggleModal={modalState.toggle}>
            <div className="text-lg font-bold">Jabatan</div>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Nama
                </span>
                <Input
                    placeholder="John Doe"
                    name="nama"
                    value={data.nama}
                    handleChange={onHandleChange}
                />
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Gaji Pokok
                </span>
                <Input
                    placeholder="081XXX"
                    name="gajiPokok"
                    value={data.gajiPokok}
                    handleChange={onHandleChange}
                    type="number"
                />
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Tunjangan
                </span>
                <Input
                    placeholder="081XXX"
                    name="tunjangan"
                    value={data.tunjangan}
                    handleChange={onHandleChange}
                    type="number"
                />
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Fee Penjualan
                </span>
                <Input
                    placeholder="081XXX"
                    name="feePenjualan"
                    value={data.feePenjualan}
                    handleChange={onHandleChange}
                    type="number"
                />
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Uang Transport
                </span>
                <Input
                    placeholder="081XXX"
                    name="transport"
                    value={data.transport}
                    handleChange={onHandleChange}
                    type="number"
                />
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Uang Makan
                </span>
                <Input
                    placeholder="081XXX"
                    name="uangMakan"
                    value={data.uangMakan}
                    handleChange={onHandleChange}
                    type="number"
                />
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Bonus
                </span>
                <Input
                    placeholder="081XXX"
                    name="bonus"
                    value={data.bonus}
                    handleChange={onHandleChange}
                    type="number"
                />
            </label>
            <Button className={'mt-4'} onClick={submit} disabled={loading} processing={loading}>
                Save
            </Button>
        </Modal>
    )
}