import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import CreateSalaryCft from '@/components/salaryCfts/CreateSalaryCft'
import React from 'react'

function CreateSalaryCftPage() {
  return (
    <DashboardLayout>
        <h1 className='font-bold py-4 mb-3 '>Thêm mới dữ liệu hệ số lương</h1>

        <CreateSalaryCft />
    </DashboardLayout>
  )
}

export default CreateSalaryCftPage