"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import PositionForm from '../forms/PositionForm';
import LoadingBlock from '../comon/LoadingBlock';
import { getPositionById, updatePosition } from '@/services/positionService';
import { toast } from 'react-toastify';

function EditPosition() {
    const params = useParams();
    const router = useRouter();
    const [position, setPosition] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!params.id) return;

        const fetchPositionById = async () => {
            try {
                const response = await getPositionById(params.id);
                setPosition(response.data);
            } catch (error) {
                console.error('Error fetching position:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPositionById();
    }, [params.id]);

    const handleUpdatePosition = async (data) => {
        if (!position?.id) return;

        await updatePosition(params.id, data);

        toast.success('Cập nhật chức vụ thành công');
        
        setTimeout(() => {
            router.push('/dashboard/positions');
        }, 1500);
    }

    if (isLoading) {
        return <LoadingBlock tittle='Đang tải dữ liệu đội công tác' />
    }
    return (
        <PositionForm 
            initialData={position}
            onSubmit={handleUpdatePosition}
        />
    )
}

export default EditPosition