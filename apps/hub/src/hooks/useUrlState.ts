import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { SearchParams } from '@/types';

export function useUrlState(
    initialState: SearchParams = {
        search: '',
        page: 1,
        sort: '',
        order: '',
    },
): [SearchParams, (newParams: Partial<SearchParams>) => void] {
    const router = useRouter();
    const searchParams = useSearchParams();

    const parseSearchParams = useCallback(
        (): SearchParams => ({
            search: searchParams.get('search') || initialState.search,
            page: Number(searchParams.get('page')) || initialState.page,
            sort: searchParams.get('sort') || initialState.sort,
            order: searchParams.get('order') || initialState.order,
        }),
        [searchParams],
    );

    const [params, setParams] = useState<SearchParams>(parseSearchParams());

    const updateURL = useCallback(
        (newParams: Partial<SearchParams>) => {
            const urlParams = new URLSearchParams();
            const updatedParams = { ...params, ...newParams };

            Object.entries(updatedParams).forEach(([key, value]) => {
                if (value) urlParams.set(key, String(value));
            });

            router.push(`?${urlParams.toString()}`);
            setParams(updatedParams);
        },
        [router, params],
    );

    useEffect(() => {
        setParams(parseSearchParams());
    }, [searchParams]);

    return [params, updateURL];
}
