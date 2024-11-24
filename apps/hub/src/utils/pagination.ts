import { ITEMS_PER_PAGE } from '@/data/constants';

export const calculateTotalPages = (totalItems: number) =>
    Math.ceil(totalItems / ITEMS_PER_PAGE);

export const calculatePageRange = (page: number) => ({
    start: (page - 1) * ITEMS_PER_PAGE,
    end: page * ITEMS_PER_PAGE,
});
