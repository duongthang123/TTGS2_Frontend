"use client"

import { getPrisonerById, updatePrisoner } from '@/services/prisoner'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import PrisonerForm from '../forms/PrisonerForm'
import { toast } from 'react-toastify'
import LoadingBlock from '../comon/LoadingBlock'

function EditPrisoner() {
    const params = useParams()
    const router = useRouter()
    const [prisoner, setPrisoner] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!params.id) return

        const fetchPrisonerById = async () => {
            try {
                const response = await getPrisonerById(params.id)
                setPrisoner(response.data.data)
            } catch (error) {
                toast.error('Không thể tải thông tin phạm nhân')
            } finally {
                setIsLoading(false)
            }
        }

        fetchPrisonerById()
    }, [params.id])

    const handleUpdate = async (data) => {
        if (!prisoner?.id) return

        await updatePrisoner(prisoner.id, data)
        toast.success('Cập nhật phạm nhân thành công')

        setTimeout(() => {
            router.push('/dashboard/prisoners')
        }, 1500)
    }

    if (isLoading) {
        return <LoadingBlock tittle='Đang tải dữ liệu can phạm nhân' />
    }

    return (
        <PrisonerForm
            onSubmit={handleUpdate}
            initialData={prisoner}
        />
    )
}

export default EditPrisoner
