import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { Modal } from '@/Components/Modal'
import { useForm } from '@inertiajs/inertia-react'
import Button from '@/Components/Button'
import Input from '@/Components/Input'
import { create, update, uploadImage } from '@/Services/Karyawan'
import { getAll as GetAllJabatan } from '@/Services/Jabatan'

export default function FormModal({ modalState, refresh }) {
    const [loading, setLoading] = useState(false)
    const { data, setData,  reset } = useForm({
        nik: '',
        name: '',
        username: '',
        password: '',
        jenisKelamin: "Laki-Laki",
        jabatan: '',
        status: 'Karyawan Tetap',
        is_admin: false,
        created_at: new Date()
    })
    const [profile, setProfile] = useState(null)
    const inputProfile = useRef()
    const [jabatans, setJabatans] = useState([])

    useEffect(() => {
        GetAllJabatan()
        .then((items) => setJabatans(items))
    },[])

    useEffect(() => {
        if (modalState.isOpen === false) {
            setProfile(null)
            reset()
            modalState.setData(null)
        }
        if (modalState.data !== null) {
            setData(modalState.data.data)
            setProfile(modalState.data.data.profile)
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

    const onHandleJabatanChange = (event) => {
        if (event.target.value == "") {
            setData({
                ...data,
                jabatan: ""
            })
            return
        }
        const jabatan = jabatans.find(item => item.id == event.target.value)
        setData({
            ...data,
            jabatan: {...jabatan.data, id : jabatan.id}
        })
    }

    const UpdateOrSave = (image) => {
        if (modalState.data !== null) {
            update({
                ...data,
                profile: image
            }, modalState.data.id)
            .finally(() => {
                reset()
                toast.success("berhasil update")
                setLoading(false)
                modalState.toggle()
                refresh()
            })
        } else {
            create({
                ...data,
                profile: image
            })
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

    const submit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(typeof(profile))
        if(typeof(profile) != "string") {
            if (profile == null) {
                alert('foto profile belum diisi')
                return
            }
            uploadImage(route('upload.image'), profile)
            .then(image => {
                console.log(image.file_name)
                UpdateOrSave(image.file_name)
            })
            .catch((err) => console.log(err))
        } else {
            UpdateOrSave(profile)
        }
    }

    return (
        <Modal isOpen={modalState.isOpen} toggleModal={modalState.toggle}>
            <div className="text-lg font-bold">Karyawan</div>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    NIK
                </span>
                <Input
                    placeholder="John Doe"
                    name="nik"
                    value={data.nik}
                    handleChange={onHandleChange}
                />
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Nama
                </span>
                <Input
                    placeholder="John Doe"
                    name="name"
                    value={data.name}
                    handleChange={onHandleChange}
                />
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Username
                </span>
                <Input
                    placeholder="John Doe"
                    name="username"
                    value={data.username}
                    handleChange={onHandleChange}
                />
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Password
                </span>
                <Input
                    placeholder="John Doe"
                    name="password"
                    value={data.password}
                    handleChange={onHandleChange}
                />
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Jenis Kelamin
                </span>
                <select
                        className="border mt-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={data.jenisKelamin}
                        name="jenisKelamin"
                        onChange={onHandleChange}
                    >
                    {["Laki-Laki", "Perempuan"].map((val, index) => (
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
                    Jabatan
                </span>
                <select
                        className="border mt-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={data.jabatan?.id}
                        name="jabatan"
                        onChange={onHandleJabatanChange}
                    >
                        <option key="random123" value=""></option>
                    {jabatans.map((val, index) => (
                        <option
                            key={`${val.nama}-${index}`}
                            value={val.id}
                        >
                            {val.data.nama}
                        </option>
                    ))}
                </select>
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Status
                </span>
                <select
                        className="border mt-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={data.status}
                        name="status"
                        onChange={onHandleChange}
                    >
                    {["Karyawan Tetap", "Karyawan Tidak Tetap"].map((val, index) => (
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
                <div className="text-gray-700 dark:text-gray-400">
                    Photo
                </div>
                <Button
                    onClick={() => {
                        console.log(inputProfile.current.click())
                    }}
                >
                    {profile ? typeof(profile) == "string" ? `${data.name}.png` : profile.name : 'Choose File'}
                </Button>
                <input
                    type='file'
                    placeholder="John Doe"
                    name="profile"
                    ref={inputProfile}
                    className="hidden"
                    onChange={(e) => setProfile(e.target.files[0])}
                    accept="image/png, image/jpeg, image/jpg"
                />
            </label>
            <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">
                    Hak Akses
                </span>
                <select
                        className="border mt-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={data.is_admin}
                        name="is_admin"
                        onChange={onHandleChange}
                    >
                    {["Admin", "User"].map((val, index) => (
                        <option
                            key={`val-${index}`}
                            value={val == "Admin"}
                        >
                            {val}
                        </option>
                    ))}
                </select>
            </label>
            <Button className={'mt-4'} onClick={submit} disabled={loading} processing={loading}>
                Save
            </Button>
        </Modal>
    )
}