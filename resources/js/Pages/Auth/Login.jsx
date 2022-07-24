import React, { useEffect, useState } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { getAllUsers } from '@/Services/User';
import { Inertia } from '@inertiajs/inertia';
import { create } from '@/Services/Karyawan';

export default function Login({ status, canResetPassword }) {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { data, setData, post } = useForm({
        name: '',
        username: '',
        password: '',
        is_admin: ''
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const checkLogin = (users) => {
        const user = users.find(item => item.username == data.username && item.password == data.password)
        if (user) {
            Inertia.post(route('login'), {
                name: user.name,
                username: user.username,
                password: user.password,
                is_admin: user.is_admin
            })
        } else {
            setError('Username atau password tidak cocok')
        }
    }

    const submit = (e) => {
        e.preventDefault();
        setLoading(true)
        getAllUsers()
            .then(items => checkLogin(items))
            .finally(() => setLoading(false))
    };

    useEffect(() => {
        // create default user
        getAllUsers()
        .then(items => {
            if(items.length <= 0) {
                create({
                    nik: "1234567890",
                    name: "admin",
                    username: "admin",
                    password: "admin",
                    jabatan: {
                        id: "1",
                        nama: "admin",
                        tunjangan: "0",
                    },
                    jenisKelamin: "Laki-Laki",
                    status: "Karyawan Tetap",
                    is_admin: "true",
                })
            }
        })
        
    }, [])

    return (
        <Guest>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className='text-center my-5 text-red-600'>
            {error}
            </div>
            <form onSubmit={submit}>
                <div>
                    <Label forInput="username" value="Username" />

                    <Input
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <Button className="ml-4" processing={isLoading}>
                        Log in
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
