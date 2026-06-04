import React from 'react'

function LoadingBlock({ tittle = 'Đang tải...', description = 'Vui lòng chờ trong giây lát.' }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white/90 px-6 py-4 shadow-lg">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent border-slate-600"></div>
        <div>
          <p className="text-sm font-medium text-slate-700">Đang tải dữ liệu...</p>
          <p className="text-xs text-slate-500">Vui lòng chờ trong giây lát.</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingBlock