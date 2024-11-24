export interface Architecture {
    id: number;
    title: string;
    author: string;
    cost: number;
    createdAt: string;
    stars: number;
    imports: number;
    tags: string[];
}

export interface ArchitectureResponse {
    total: number;
    data: Architecture[];
}

export interface SearchParams {
    search: string;
    page: number;
    sort: string;
    order: string;
}
