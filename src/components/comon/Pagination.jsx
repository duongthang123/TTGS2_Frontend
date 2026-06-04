import React from 'react'

function Pagination({totalPages, currentPage, onPageChange}) {
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 10) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1);

        if (currentPage > 4) {
            pages.push("...");
        }

        const start = Math.max(2, currentPage - 2);
        const end = Math.min(totalPages - 1, currentPage + 2);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 3) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

    const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
            <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700 space-x-2">
                    Trang
                    <span className="font-medium ml-2 mr-2">{currentPage}</span>
                    of
                    <span className="font-medium ml-2 mr-2">{totalPages}</span>
                </p>
            </div>
            <div>
                <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                    <button 
                        href="#" className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}    
                    >
                        <span className="sr-only">Previous</span>
                        <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                            <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                    </button>

                    {pageNumbers.map((page, idx) =>
                        page === "..." ? (
                            <span
                                key={`ellipsis-${idx}`}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={`page-${page}-${idx}`}
                                onClick={() => onPageChange(page)}
                                className={`relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 ${
                                    page === currentPage
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                {page}
                            </button>
                        )
                        )}

                    <button
                        href="#" className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    >
                        <span className="sr-only">Next</span>
                        <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                            <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    </div>

  )
}

export default Pagination