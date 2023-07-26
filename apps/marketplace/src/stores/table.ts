// ** ZuStand Imports
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// ** Types Imports
import type {
  Pagination,
  TSortableDirection,
  TSortableField,
} from '@/utils/api/server/zod/listingTable';

export type TableMode = 'NORMAL' | 'SEARCH' | 'CATEGORY';
export type TableDisplayLimit = 10 | 25 | 50;

export interface TableStates {
  mode: TableMode;
  searchString: string;
  categoryId: string;
  sortBy: TSortableField;
  sortDirection: TSortableDirection;
  page: number;
  nextPage: number | null;
  prevPage: number | null;
  totalCount: number;
  totalPage: number;
  limit: TableDisplayLimit;
  selected: string[];
}

export interface TableActions {
  resetStates: () => void;
  setNormalMode: () => void;
  setSearchMode: () => void;
  setCategoryMode: () => void;
  setSearchString: (value: string) => void;
  setCategoryId: (value: string) => void;
  setSortBy: (value: TSortableField) => void;
  setSortDirection: (value: TSortableDirection) => void;
  setPagination: (paginationData: Pagination) => void;
  updatePagination: (paginationData: Partial<Pagination>) => void;
  addSelected: (listingId: string) => void;
  addManySelected: (listingIds: string[]) => void;
  removeSelected: (listingId: string) => void;
  clearSelected: () => void;
}

const initialState: TableStates = {
  mode: 'NORMAL',
  searchString: '',
  categoryId: '',
  sortBy: 'createdAt',
  sortDirection: 'desc',
  page: 0,
  nextPage: null,
  prevPage: null,
  totalCount: 0,
  totalPage: 1,
  limit: 10,
  selected: [],
};

const useTableStore = create<TableStates & TableActions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      resetStates: () => {
        set(initialState);
      },
      setNormalMode: () => {
        if (get().mode !== 'NORMAL')
          set({
            mode: 'NORMAL',
          });
      },
      setSearchMode: () => {
        if (get().mode !== 'SEARCH')
          set({
            mode: 'SEARCH',
          });
      },
      setCategoryMode: () => {
        if (get().mode !== 'CATEGORY')
          set({
            mode: 'CATEGORY',
          });
      },
      setSearchString: (searchString) => {
        set({
          searchString,
        });
      },
      setCategoryId: (categoryId) => {
        set({
          categoryId,
        });
      },
      setSortBy: (sortBy) => {
        set({
          sortBy,
        });
      },
      setSortDirection: (sortDirection) => {
        set({
          sortDirection,
        });
      },
      setPagination: (pagination) => {
        const { limit, ...rest } = pagination;
        const paginationData: Partial<TableStates> = { ...rest };
        if ([10, 25, 50].indexOf(limit) !== -1) {
          paginationData.limit = limit as TableDisplayLimit;
        }

        set(paginationData);
      },
      updatePagination: (pagination = {}) => {
        const { limit, ...rest } = pagination;
        const paginationData: Partial<TableStates> = { ...rest };
        if (limit !== undefined && [10, 25, 50].indexOf(limit) !== -1) {
          paginationData.limit = limit as TableDisplayLimit;
        }

        set(paginationData);
      },
      addSelected: (listingId) => {
        set({
          selected: [...get().selected, listingId],
        });
      },
      addManySelected: (listingIds) => {
        set({
          selected: [...get().selected, ...listingIds],
        });
      },
      removeSelected: (listingId) => {
        set({
          selected: get().selected.filter((s) => s !== listingId),
        });
      },
      clearSelected: () => {
        set({
          selected: [],
        });
      },
    }),
    {
      name: 'table-store',
    }
  )
);

export default useTableStore;

export const useTableMode = () =>
  useTableStore((state) => {
    const { mode, setNormalMode, setCategoryMode, setSearchMode } = state;
    const tableActions = {
      setNormalMode,
      setCategoryMode,
      setSearchMode,
    };
    return [mode, tableActions] as [typeof mode, typeof tableActions];
  });

export const useTableStates = () =>
  useTableStore((state) => {
    const { searchString, categoryId, setSearchString, setCategoryId } = state;
    const tableStates = { searchString, categoryId };
    const tableActions = {
      setSearchString,
      setCategoryId,
    };
    return [tableStates, tableActions] as [typeof tableStates, typeof tableActions];
  });

export const useTablePagination = () =>
  useTableStore((state) => {
    const {
      page,
      nextPage,
      prevPage,
      limit,
      totalPage,
      totalCount,
      setPagination,
      updatePagination,
    } = state;

    const paginationStates = { page, nextPage, prevPage, limit, totalPage, totalCount };
    const paginationActions = { setPagination, updatePagination };

    return [paginationStates, paginationActions] as [
      typeof paginationStates,
      typeof paginationActions
    ];
  });

export const useTableSelection = () =>
  useTableStore((state) => {
    const { selected, addSelected, addManySelected, removeSelected, clearSelected } = state;

    const selectionActions = { addSelected, addManySelected, removeSelected, clearSelected };

    return [selected, selectionActions] as [typeof selected, typeof selectionActions];
  });

export const useTableSort = () =>
  useTableStore((state) => {
    const { sortBy, setSortBy, sortDirection, setSortDirection } = state;
    const sortStates = { sortBy, sortDirection };
    const sortActions = { setSortBy, setSortDirection };

    return [sortStates, sortActions] as [typeof sortStates, typeof sortActions];
  });
