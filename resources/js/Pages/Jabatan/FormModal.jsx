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
        tunjangan: 0
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
            <Button className={'mt-4'} onClick={submit} disabled={loading} processing={loading}>
                Save
            </Button>
        </Modal>
    )
}