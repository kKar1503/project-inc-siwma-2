import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface BookmarkStates {
  bookmarks: string[];
}

export interface BookmarkActions {
  setBookmarks: (bookmarks: string[]) => void;
}

const initialState: BookmarkStates = {
  bookmarks: [],
};

const useBookmarkStore = create<BookmarkStates & BookmarkActions>()(
  devtools(
    (set) => ({
      ...initialState,
      setBookmarks: (bookmarks) => {
        set({ bookmarks: [...bookmarks] });
      },
    }),
    { name: 'bookmark-store' }
  )
);

export default useBookmarkStore;
