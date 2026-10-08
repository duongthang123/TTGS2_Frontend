"use client"

import React, { useEffect, useState } from 'react'
import UnitForm from '../forms/UnitForm'
import { getUnitById, updateUnit } from '@/services/unitService';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import LoadingBlock from '../comon/LoadingBlock';

function EditUnit() {
    const params = useParams();
    const router = useRouter();
    const [unit, setUnit] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if (!params.id) return;

        const fetchUnitById = async () => {
            try {
                const response = await getUnitById(params.id);
                setUnit(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUnitById();
    }, [params.id]);
    
    const handleUpdate = async (data) => {
        if (!unit?.id) return;

        await updateUnit(params.id, data);

        toast.success('Cập nhật người dùng thành công');
        
        setTimeout(() => {
            router.push('/dashboard/units');
        }, 1500);
    }

    if (isLoading) {
        return <LoadingBlock tittle='Đang tải dữ liệu đội công tác' />

    }

    return (
        <UnitForm 
            onSubmit={handleUpdate}
            initialData={unit}
        />
  )
}

export default EditUnit