import { ArchitectureHeader } from './header';
import { ArchitectureItem } from './item';
import { Pagination } from '../Pagination';
import type { Architecture } from '@/types';

interface ArchitecturesProps {
    data: Architecture[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onSort: (column: string) => void;
    sort?: string;
    order?: 'asc' | 'desc';
}

export const Architectures = ({
    data,
    currentPage,
    totalPages,
    onPageChange,
    onSort,
    sort,
    order,
}: ArchitecturesProps) => {
    const hasData = data && data.length > 0;

    if (!hasData) {
        return (
            <div className="max-w-5xl mx-auto">
                <div className="text-center py-10 text-gray-500">
                    No architectures found. Try different search terms.
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto my-4">
                <ArchitectureHeader onSort={onSort} sort={sort} order={order} />
                {data?.length ? (
                    data.map((item) => (
                        <ArchitectureItem key={item.id} {...item} />
                    ))
                ) : (
                    <div className="text-center py-10">
                        No architectures found
                    </div>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
};
