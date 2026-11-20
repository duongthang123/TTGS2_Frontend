"use client"

import React from 'react'
import PrisonerForm from '../forms/PrisonerForm'
import { createPrisoner } from '@/services/prisoner'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

function CreatePrisoner() {
    const router = useRouter()

    const handleCreate = async (data) => {
        await createPrisoner(data)
        toast.success('Tạo phạm nhân thành công')
        setTimeout(() => {
            router.push('/dashboard/prisoners')
        }, 1500)
    }

    return (
        <PrisonerForm
            onSubmit={handleCreate}
        />
    )
}

export default CreatePrisoner