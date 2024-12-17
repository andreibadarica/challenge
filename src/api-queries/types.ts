export interface BookItem {
    id: string;
    title: string;
    authors?: string[];
    categories?: string[];
    thumbnail?: string;
    description?: string;
}

export interface BooksResponse {
    items: BookItem[];
    totalItems: number;
}

export interface QueryParams {
    q?: string;
    category?: string;
    startIndex?: number;
    limit?: number;
}
