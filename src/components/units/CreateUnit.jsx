"use client"

import React from 'react'
import UnitForm from '../forms/UnitForm'
import { createUnit } from '@/services/unitService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function CreateUnit() {
    const router = useRouter();
    
    const handleCreate = async (data) => {
        await createUnit(data);
        toast.success('Tạo đội công tác thành công');
        setTimeout(() => {
            router.push('/dashboard/units');
        }, 1500);
    }
    return (
        <UnitForm
            onSubmit={handleCreate}
        />
  )
}

export default CreateUnit