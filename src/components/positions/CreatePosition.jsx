"use client"

import { createPosition } from '@/services/positionService';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
import PositionForm from '../forms/PositionForm';

function CreatePosition() {
    const router = useRouter();
        
    const handleCreatePostion = async (data) => {
        await createPosition(data);

        toast.success('Tạo chức vụ thành công');

        setTimeout(() => {
            router.push('/dashboard/positions');
        }, 1500);
    }

    return (
        <PositionForm
            onSubmit={handleCreatePostion}
        />
    )
}

export default CreatePosition