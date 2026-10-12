"use client"

import React, { useEffect, useState } from 'react'
import SalaryCftForm from '../forms/SalaryCftForm'
import LoadingBlock from '../comon/LoadingBlock'
import { useParams, useRouter } from 'next/navigation';
import { getSalaryCftById, updateSalaryCft } from '@/services/salaryCftService';
import { toast } from 'react-toastify';

function EditSalaryCft() {
    const params = useParams();
    const router = useRouter();
    const [salaryCft, setSalaryCft] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            if (!params.id) return;
    
            const fetchSalaryCftById = async () => {
                try {
                    const response = await getSalaryCftById(params.id);
                    const data = response.data;
                    setSalaryCft({
                        ...data,
                        user: data.user
                            ? {
                                id: data.user.user_id,
                                name: data.user.user_name,
                            }
                            : null,
                    });
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            }
            fetchSalaryCftById();
        }, [params.id]);

    const handleUpdateSalaryCft = async (data) => {
        if (!salaryCft?.id) return;
        
        await updateSalaryCft(params.id, data);

        toast.success('Cập nhật dữ liệu hế số lương thành công');
        
        setTimeout(() => {
            router.push('/dashboard/salary-cfts');
        }, 1500);
    }

    if (isLoading) {
        return <LoadingBlock tittle='Đang tải dữ liệu hệ số lương' />

    }

    return (
        <SalaryCftForm 
            initialData={salaryCft}
            onSubmit={handleUpdateSalaryCft}
        />
    )
}

export default EditSalaryCft