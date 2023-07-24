// ** ZuStand Imports
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// ** Types Imports
import type { Pagination } from '@/utils/api/server/zod/listingTable';

export type TableMode = 'NORMAL' | 'SEARCH' | 'CATEGORY';
export type TableDisplayLimit = 10 | 25 | 50;

export interface TableStates {
  mode: TableMode;
  searchString: string;
  categoryId: string;
  page: number;
  nextPage: number | null;
  prevPage: number | null;
  totalCount: number;
  totalPage: number;
  limit: TableDisplayLimit;
  selected: number[];
}

export interface TableActions {
  resetStates: () => void;
  setNormalMode: () => void;
  setSearchMode: () => void;
  setCategoryMode: () => void;
  setSearchString: (value: string) => void;
  setCategoryId: (value: string) => void;
  setPagination: (paginationData: Pagination) => void;
  addSelected: (listingId: number) => void;
  addManySelected: (listingIds: number[]) => void;
  removeSelected: (listingId: number) => void;
  clearSelected: () => void;
}

const initialState: TableStates = {
  mode: 'NORMAL',
  searchString: '',
  categoryId: '',
  page: 0,
  nextPage: null,
  prevPage: null,
  totalCount: 0,
  totalPage: 1,
  limit: 10,
  selected: [],
};

const useTableStore = create<TableStates & TableActions>()(
  devtools((set, get) => ({
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
    setPagination: (pagination) => {
      const { limit, ...rest } = pagination;
      const paginationData: Partial<TableStates> = { ...rest };
      if ([10, 25, 50].indexOf(limit) !== -1) {
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
  }))
);

export default useTableStore;
