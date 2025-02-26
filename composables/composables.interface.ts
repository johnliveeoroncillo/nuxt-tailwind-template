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

export interface Columns {
    key: string;
    label: string;
    class?: string;
    sort?: boolean;
}

export interface Pagination<T> {
    pagination: PaginationPage;
    sort?: Record<string, 'ASC' | 'DESC'>;
    columns: Columns[];
    data: T[];
}
