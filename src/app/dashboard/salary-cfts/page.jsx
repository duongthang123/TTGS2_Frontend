import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import PermissionGuard from '@/components/guards/PermissionGuard'
import SalaryCftTable from '@/components/salaryCfts/SalaryCftTable'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

function SalaryCftPage() {
  return (
    <DashboardLayout>
      <div className='flex justify-between'>
			<h1 className='pt-2 py-4 font-bold'>Quản lý hệ số lương cán bộ chiến sĩ</h1>
			
			<PermissionGuard permissions={["create-salary-cfts"]}>

				<Link href="/dashboard/salary-cfts/create" 
						className="flex items-center px-3 py-2 h-[36px] my-auto bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
				>
					<UserPlusIcon className='w-6 h-6 font-bold pr-1'></UserPlusIcon>
					<span>Thêm mới</span>
				</Link>
			</PermissionGuard>
        </div>

      <SalaryCftTable />
    </DashboardLayout>
  )
}

export default SalaryCftPage