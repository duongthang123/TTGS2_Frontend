"use client"

import { createRank } from '@/services/rankService';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
import RankForm from '../forms/RankForm';

function CreateRank() {
    const router = useRouter();
    
    const handleCreate = async (data) => {
        await createRank(data);
        toast.success('Tạo cấp bậc thành công');
        setTimeout(() => {
            router.push('/dashboard/ranks');
        }, 1500);
    }

    return (
        <RankForm
            onSubmit={handleCreate}
        />
  )
}

export default CreateRank