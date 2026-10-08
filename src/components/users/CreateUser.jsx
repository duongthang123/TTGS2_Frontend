"use client"

import React from 'react'
import UserForm from '../forms/UserForm'
import { createUser } from '@/services/userService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function CreateUser() {
	const router = useRouter();
	const handleCreate = async (data) => {
			await createUser(data);

			toast.success('Tạo người dùng thành công');
			setTimeout(() => {
				router.push('/dashboard/users');
			}, 1500);
		}
	
	return (
		<UserForm 
		onSubmit={handleCreate}
		/>
	)
}

export default CreateUser