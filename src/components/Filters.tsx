import React from "react";

interface FiltersProps {
    q: string;
    category: string;
    categories: string[];
    setQ: (val: string) => void;
    setCategory: (val: string) => void;
}

export function Filters({
    q,
    category,
    categories,
    setQ,
    setCategory,
}: FiltersProps) {
    return (
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mb-6'>
            <div className='w-full sm:w-1/2'>
                <input
                    type='text'
                    placeholder='Search articles'
                    className='w-full border border-gray-300 rounded p-2'
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
            </div>
            <div className='w-full sm:w-1/4'>
                <select
                    className='w-full border border-gray-300 rounded p-2'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
