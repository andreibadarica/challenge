import React from "react";

export function ArticlesListSkeleton() {
    // Show a grid of skeleton cards to indicate loading
    const skeletons = Array.from({ length: 9 });
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {skeletons.map((_, i) => (
                <div
                    key={i}
                    className='border border-gray-200 rounded shadow-sm overflow-hidden flex flex-col animate-pulse'
                >
                    <div className='w-full h-48 bg-gray-300'></div>
                    <div className='p-4 flex flex-col flex-1'>
                        <div className='h-4 bg-gray-300 rounded w-1/2 mb-2'></div>
                        <div className='h-3 bg-gray-200 rounded w-1/3 mb-2'></div>
                        <div className='h-3 bg-gray-200 rounded w-full mb-2'></div>
                        <div className='h-3 bg-gray-200 rounded w-2/3 mb-2'></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
