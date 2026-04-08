"use client";

import { AuthContext } from "@/context/AuthContext";
import { login } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation"
import React, { useContext, useState } from 'react'

export const LoginForm = () => {
    const router = useRouter();
    const {setUser} = useContext(AuthContext);

    const [citizenNumber, setCitizenNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);


    const handleCitizenNumber = (e) => {
        setCitizenNumber(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(null);

        try {
            const response = await login(
                citizenNumber,
                password,
            )
            setUser(response.data.user);
            router.push("/dashboard");
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

  return (
    <>
        <div className='w-full max-w-lg bg-white p-8 rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.25)]'>
            <h1 className='pb-8 text-3xl text-center font-bold'>Đăng nhập</h1>

            <form className='space-y-5' onSubmit={handleSubmit}>
                <div>
                    <label className="block text-md mb-1 font-bold">
                        Mã định danh
                    </label>
                    <input 
                        type='text'
                        className="w-full rounded-sm border border-gray-300 p-2 focus:outline-none focus:border-gray-700 transition ease-in-out" 
                        value={citizenNumber}
                        onChange={handleCitizenNumber}
                    />
                </div>

                <div>
                    <label className="block text-md font-bold mb-1">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        className="w-full rounded-sm border border-gray-300 p-2 focus:outline-none focus:border-gray-700 transition ease-in-out"
                        value={password}
                        onChange={handlePassword}
                    />
                </div>

                {errors && (
                    <p className="text-red-500 text-center">{errors.citizen_number || errors.password || errors.message}</p>
                )}

                <button 
                    type='submit'  
                    className='w-full cursor-pointer bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700 transition'
                >
                    Đăng nhập
                </button>

                <div className="text-center text-sm text-gray-500">
                    Bạn chưa có tài khoản? 
                    <Link href="#" className="text-blue-600 ml-1 hover:underline">
                        Đăng ký ngay!
                    </Link>
                </div>
            </form>
        </div>

        
    </>
    
  )
}
