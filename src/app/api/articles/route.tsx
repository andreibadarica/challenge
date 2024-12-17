import { NextResponse } from "next/server";

const BASE_URL = process.env.BASE_BOOKS_API_URL;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "programming";
    const startIndex = parseInt(searchParams.get("startIndex") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const googleRes = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(
            q
        )}&startIndex=${startIndex}&maxResults=${limit}`
    );
    if (!googleRes.ok) {
        return NextResponse.json({ items: [], totalItems: 0 }, { status: 500 });
    }

    const data = await googleRes.json();

    const items = (data.items || []).map((item: any) => {
        const volumeInfo = item.volumeInfo || {};
        return {
            id: item.id,
            title: volumeInfo.title,
            authors: volumeInfo.authors,
            categories: volumeInfo.categories || [],
            thumbnail: volumeInfo.imageLinks?.thumbnail,
            description: volumeInfo.description,
        };
    });

    return NextResponse.json({
        items,
        totalItems: data.totalItems || items.length,
    });
}
