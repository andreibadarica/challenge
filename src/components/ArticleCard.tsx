import Image from "next/image";
import React from "react";
import { BookItem } from "../api-queries/types";

interface ArticleCardProps {
    item: BookItem;
}

export function ArticleCard({ item }: ArticleCardProps) {
    return (
        <div className='border border-gray-200 rounded shadow-sm overflow-hidden flex flex-col'>
            {item.thumbnail && (
                <Image
                    src={item.thumbnail}
                    alt={item.title}
                    className='w-full h-48'
                    height='192'
                    width='300'
                />
            )}
            <div className='p-4 flex flex-col flex-1'>
                <h2 className='text-lg font-semibold mb-1'>{item.title}</h2>
                {item.authors && (
                    <p className='text-sm text-gray-600 mb-2'>
                        By: {item.authors.join(", ")}
                    </p>
                )}
                {item.categories && item.categories.length > 0 && (
                    <p className='text-sm text-blue-700 mb-2'>
                        Categories: {item.categories.join(", ")}
                    </p>
                )}
                <p className='text-sm text-gray-800 flex-1'>
                    {item.description
                        ? item.description.substring(0, 100) + "..."
                        : "No description"}
                </p>
            </div>
        </div>
    );
}
