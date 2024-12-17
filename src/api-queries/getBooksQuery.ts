import { BooksResponse, QueryParams } from "./types";

export async function getBooks(
    queryParams: QueryParams
): Promise<BooksResponse> {
    const {
        q: searchTerm = "",
        category: selectedCategory = "",
        startIndex = 0,
        limit = 10,
    } = queryParams;

    let searchQuery = "";
    if (searchTerm && selectedCategory) {
        searchQuery = `${searchTerm}+subject:${selectedCategory}`;
    } else if (searchTerm && !selectedCategory) {
        searchQuery = searchTerm;
    } else if (!searchTerm && selectedCategory) {
        searchQuery = `subject:${selectedCategory}`;
    } else {
        // If neither search nor category is provided, default to 'programming'
        searchQuery = "computers";
    }

    const url = new URL("/api/articles", window.location.origin);
    url.searchParams.set("q", searchQuery);
    url.searchParams.set("startIndex", startIndex.toString());
    url.searchParams.set("limit", limit.toString());

    const res = await fetch(url.toString());
    if (!res.ok) {
        throw new Error("Failed to fetch articles");
    }
    return res.json();
}
