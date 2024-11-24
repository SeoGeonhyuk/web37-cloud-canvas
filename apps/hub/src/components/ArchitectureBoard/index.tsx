import { useUrlState } from '@/hooks/useUrlState';
import { mockFetch } from '@/mocks/architectures';
import { ErrorMessage } from '@/ui/ErrorMessage';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { useCallback, useEffect, useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { BoardHeader } from './BoardHeader';
import { ArchitectureList } from './ArchitectureList';
import { Pagination } from '../Pagination';
import { calculateTotalPages } from '@/utils/pagination';

export const ArchitectureBoard = () => {
    const [params, setParams] = useUrlState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [architectures, setArchitectures] = useState<ArchitectureResponse>({
        total: 0,
        data: [],
    });

    const fetchArchitectures = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await mockFetch(params);
            setArchitectures(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setArchitectures({ total: 0, data: [] });
        } finally {
            setIsLoading(false);
        }
    }, [params]);

    useEffect(() => {
        fetchArchitectures();
    }, [params]);

    const handleSearch = (keyword: string) =>
        setParams({ search: keyword, page: 1 });

    const handlePageChange = (page: number) => setParams({ page });

    const handleSort = (column: string) => {
        const newOrder =
            params.sort === column && params.order === 'asc' ? 'desc' : 'asc';
        setParams({ sort: column, order: newOrder, page: 1 });
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mx-auto px-4">
            <SearchBar onSearch={handleSearch} />
            <BoardHeader
                sort={params.sort}
                order={params.order}
                onSort={handleSort}
            />
            <ArchitectureList data={architectures.data} />
            <Pagination
                currentPage={params.page}
                totalPages={calculateTotalPages(architectures.total)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
