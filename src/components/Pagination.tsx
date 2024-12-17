import React from "react";

interface PaginationProps {
    startIndex: number;
    limit: number;
    totalItems: number;
    setStartIndex: (val: number) => void;
}

export function Pagination({
    startIndex,
    limit,
    totalItems,
    setStartIndex,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Math.floor(startIndex / limit) + 1;

    return (
        <div className='flex justify-center items-center gap-4 mt-6'>
            <button
                className='px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50'
                disabled={startIndex === 0}
                onClick={() => setStartIndex(startIndex - limit)}
            >
                Previous
            </button>
            <p className='text-sm text-gray-700'>
                Page {currentPage} of {totalPages || 1}
            </p>
            <button
                className='px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50'
                disabled={startIndex + limit >= totalItems}
                onClick={() => setStartIndex(startIndex + limit)}
            >
                Next
            </button>
        </div>
    );
}
