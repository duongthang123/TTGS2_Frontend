"use client"

import React from 'react'
import SalaryCftForm from '../forms/SalaryCftForm'
import { createSalaryCft } from '@/services/salaryCftService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function CreateSalaryCft() {
    const router = useRouter();

    const handleCreate = async (data) => {
        await createSalaryCft(data);

        toast.success('Tạo đội dữ liệu hệ số lương thành công');
        setTimeout(() => {
            router.push('/dashboard/salary-cfts');
        }, 1500);
    }

    return (
        <SalaryCftForm 
            onSubmit={handleCreate}
        />
  )
}

export default CreateSalaryCft