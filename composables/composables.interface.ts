export interface Response<T> {
    code: number;
    message: string;
    data?: T;
}

export type ObjectLiteral = Record<string, any>;

export interface PaginationPage {
    total_rows: number;
    page: number;
    limit?: number;
    max_page: number;
}

export interface Pagination<T> {
    pagination: PaginationPage;
    data: T[];
}
