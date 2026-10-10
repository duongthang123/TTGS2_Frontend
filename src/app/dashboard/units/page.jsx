import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import PermissionGuard from '@/components/guards/PermissionGuard'
import UnitTable from '@/components/units/UnitTable'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

function UnitPage() {
  return (
    <DashboardLayout>
      <div className='flex justify-between'>
			<h1 className='py-4 font-bold'>Danh sách các đội công tác</h1>
			
			<PermissionGuard permissions={["create-unit"]}>

				<Link href="/dashboard/units/create" 
						className="flex items-center px-3 py-2 h-[36px] my-auto bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
				>
					<UserPlusIcon className='w-6 h-6 font-bold pr-1'></UserPlusIcon>
					<span>Thêm mới</span>
				</Link>
			</PermissionGuard>
        </div>

      <UnitTable />
    </DashboardLayout>
  )
}

export default UnitPage