"use client"

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import RankForm from '../forms/RankForm';
import LoadingBlock from '../comon/LoadingBlock';
import { getRankById, updateRank } from '@/services/rankService';
import { toast } from 'react-toastify';

function EditRank() {
    const params = useParams();
    const router = useRouter();
    const [rank, setRank] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!params.id) return;

        const fetchRankById = async () => {
            try {
                const response =  await getRankById(params.id);
                setRank(response.data);
            } catch (error) {
                console.error('Error fetching rank:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchRankById();
    }, [params.id]);

    const handleUpdateRank = async (data) => {
        if (!rank?.id) return;

        await updateRank(params.id, data);

        toast.success('Cập nhật cấp bậc thành công');
        
        setTimeout(() => {
            router.push('/dashboard/ranks');
        }, 1500);
    }

    if (isLoading) {
        return <LoadingBlock tittle='Đang tải dữ liệu đội công tác' />
    }

    return (
        <RankForm 
            initialData={rank}
            onSubmit={handleUpdateRank}
        />
  )
}

export default EditRank