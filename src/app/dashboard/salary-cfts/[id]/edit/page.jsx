import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import EditSalaryCft from '@/components/salaryCfts/EditSalaryCft'
import React from 'react'

function EditSalaryCftPage() {
    return (
        <DashboardLayout>
            <h1 className='font-bold py-4 mb-3 text-2xl'>Chỉnh sửa dữ liệu hệ số lương</h1>

            <EditSalaryCft />
        </DashboardLayout>
    )
}

export default EditSalaryCftPage