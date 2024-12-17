"use client";

import React, { useEffect, useState, useRef } from "react";
import { getBooks } from "@/api-queries/getBooksQuery";
import { BooksResponse } from "@/api-queries/types";
import { useDebounce } from "@/hooks/useDebounce";
import { Filters } from "@/components/Filters";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticlesListSkeleton } from "@/components/ArticlesListSkeleton";

export default function HomePage() {
    // Set category default to "Computers"
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("Computers");
    const [startIndex, setStartIndex] = useState(0);
    const limit = 10;

    const debouncedQ = useDebounce(q, 500);

    const [items, setItems] = useState<BooksResponse["items"]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);

    const prevParamsRef = useRef<{ q: string; category: string }>({
        q: "",
        category: "Computers",
    });

    // Fetch categories once
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("/api/categories");
            if (res.ok) {
                const cats = await res.json();
                setCategories(cats);
            }
        };
        fetchCategories();
    }, []);

    // Reset pagination on q or category change
    useEffect(() => {
        setStartIndex(0);
    }, [debouncedQ, category]);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getBooks({
                    q: debouncedQ,
                    category,
                    startIndex,
                    limit,
                });

                const qChanged = debouncedQ !== prevParamsRef.current.q;
                const categoryChanged =
                    category !== prevParamsRef.current.category;

                if (qChanged || categoryChanged) {
                    // New search or category: reset items and totalItems
                    setItems(response.items);
                    setTotalItems(response.totalItems);
                    prevParamsRef.current = { q: debouncedQ, category };
                } else {
                    // Same query/category: just update items for new page
                    setItems(response.items);
                    setTotalItems(response.totalItems);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [debouncedQ, category, startIndex, limit]);

    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Math.floor(startIndex / limit) + 1;

    const canGoPrevious = startIndex > 0;
    const canGoNext = startIndex + limit < totalItems;

    return (
        <div className='p-6 max-w-5xl mx-auto'>
            <h1 className='text-3xl font-bold text-center mb-6'>Articles</h1>

            <Filters
                q={q}
                category={category}
                categories={categories}
                setQ={(val) => setQ(val)}
                setCategory={(val) => setCategory(val)}
            />

            {error && <div className='text-red-500 text-center'>{error}</div>}

            {loading && items.length === 0 ? (
                <ArticlesListSkeleton />
            ) : (
                <>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {items.map((item, index) => (
                            <ArticleCard
                                key={`${item.id}-${index}`}
                                item={item}
                            />
                        ))}
                    </div>

                    {totalItems > 0 && (
                        <div className='flex justify-center items-center gap-4 mt-6'>
                            <button
                                className='px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50'
                                disabled={!canGoPrevious}
                                onClick={() =>
                                    setStartIndex((prev) => prev - limit)
                                }
                            >
                                Previous
                            </button>
                            <p className='text-sm text-gray-700'>
                                Page {currentPage} of {totalPages || 1}
                            </p>
                            <button
                                className='px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50'
                                disabled={!canGoNext}
                                onClick={() =>
                                    setStartIndex((prev) => prev + limit)
                                }
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
