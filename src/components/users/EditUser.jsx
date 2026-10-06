"use client"

import { getUserById, updateUser } from '@/services/userService';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import UserForm from '../forms/UserForm';
import { toast } from 'react-toastify';

function EditUser() {
    const params = useParams();
	const router = useRouter();
	const [user, setUser] = useState({});

	useEffect(() => {
		if (!params.id) return;

		const fetchUserById = async () => {
			try {
				const response = await getUserById(params.id);
				console.log(response.data.data);
				
				setUser(response.data.data);
			} catch (error) {
				console.log(error);
			} 
		}

		fetchUserById();
	}, [params.id]);

	const handleUpdate = async (data) => {
		if (!user?.id) return;

		await updateUser(user.id, data);
		toast.success('Cập nhật người dùng thành công');

		setTimeout(() => {
			router.push('/dashboard/users');
		}, 1500);
	}

	return (
		<UserForm 
			onSubmit={handleUpdate}
			initialData={user}
		/>
	)
}

export default EditUser