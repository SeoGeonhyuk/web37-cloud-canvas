import { ArrowDownIcon } from '@/ui/ArrowDownIcon';
import { ArrowUpIcon } from '@/ui/ArrowUpIcon';
import { SortIcon } from '@/ui/SortIcon';

interface ArchitectureHeaderProps {
    onSort: (column: string) => void;
    sort?: string;
    order?: 'asc' | 'desc';
}

export const ArchitectureHeader = ({
    onSort,
    sort,
    order,
}: ArchitectureHeaderProps) => {
    const columns = [
        { key: 'name', title: 'Architecture', width: 'w-full' },
        { key: 'cost', title: 'Costs', width: 'w-40' },
        { key: 'imports', title: 'Imports', width: 'w-40' },
        { key: 'stars', title: 'Stars', width: 'w-40' },
    ];

    const getSortIcon = (columnKey: string) => {
        if (sort === columnKey) {
            if (order === 'asc') return <ArrowUpIcon size={10} />;
            if (order === 'desc') return <ArrowDownIcon size={10} />;
        }
        return <SortIcon />;
    };

    return (
        <div className="bg-gray-50 flex border-b p-3 pl-4 font-semibold">
            {columns.map((column) => (
                <div
                    key={column.key}
                    className={`${column.width} cursor-pointer hover:bg-gray-100 flex items-center gap-1`}
                    onClick={() => onSort(column.key)}
                >
                    <span>{column.title}</span>
                    <span>{getSortIcon(column.key)}</span>
                </div>
            ))}
        </div>
    );
};
