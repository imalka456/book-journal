export interface Book {
    id: number | undefined,
    title: string;
    isbn: string;
    created_at: string;
    user_id: number;
    status: string;
    start_date: string | null; // Allow null since the data might be incomplete
    end_date: string | null;
}