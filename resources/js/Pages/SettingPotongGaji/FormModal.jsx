import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Modal } from '@/Components/Modal'
import { useForm } from '@inertiajs/inertia-react'
import Button from '@/Components/Button'
import Input from '@/Components/Input'
import { create, update } from '@/Services/SettingPotonganGaji'

export default function FormModal({ modalState, refresh }) {
    const [loading, setLoading] = useState(false)
    const { data, setData,  reset } = useForm({
        jenis: 'alfa',
        potongan: 0
    })

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
            <div className="text-lg font-bold">Setting Potongan Gaji</div>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Jenis Potongan
                </span>
                <select
                        className="border mt-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={data.jenis}
                        name="jenis"
                        onChange={onHandleChange}
                    >
                    {["alfa", "sakit"].map((val, index) => (
                        <option
                            key={`val-${index}`}
                            value={val}
                        >
                            {val}
                        </option>
                    ))}
                </select>
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Jumlah Potongan
                </span>
                <Input
                    placeholder="081XXX"
                    name="potongan"
                    value={data.potongan}
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