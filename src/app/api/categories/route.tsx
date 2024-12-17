import { NextResponse } from "next/server";

// Mock categories for demonstration
const categories = [
    "Computers",
    "Fiction",
    "Science",
    "History",
    "Philosophy",
    "Art",
    "Biography",
    "Mystery",
    "Romance",
];

export async function GET() {
    return NextResponse.json(categories);
}
