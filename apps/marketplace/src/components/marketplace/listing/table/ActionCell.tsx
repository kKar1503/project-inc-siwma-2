// ** React Imports
import React, { useEffect, useMemo } from 'react';

// ** Mui Imports
import Box from '@mui/material/Box';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MoreVert';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatIcon from '@mui/icons-material/Chat';

// ** Hooks Imports
import { useResponsiveness } from '@inc/ui';
import useBookmarkStore from '@/stores/bookmarks';
import { useTableSelection } from '@/stores/table';
import useBookmarkListing from '@/services/bookmarks/useBookmarkListing';
import { useRouter } from 'next/router';

// ** Action Cell Prop Types
export interface ActionCellProps {
  listingId: string;
}

const ActionCell = (props: ActionCellProps & TableCellProps) => {
  // ** Props
  const { listingId, ...tableCellProps } = props;

  // ** Store
  const { bookmarks, setBookmarks } = useBookmarkStore();
  const [selection, selectionActions] = useTableSelection();

  // ** Hooks
  const [isSm] = useResponsiveness(['sm']);
  const router = useRouter();
  const {
    refetch: toggleBookmarkListing,
    isError: isToggleBookmarkError,
    data: bookmarkData,
    isFetched: isToggleBookmarkFetched,
    isFetching: isToggleBookmarkFetching,
  } = useBookmarkListing(listingId);

  // ** Memos
  const bookmarked = useMemo(() => bookmarks.indexOf(listingId) !== -1, [bookmarks, listingId]);
  const checked = useMemo(() => selection.indexOf(listingId) !== -1, [selection, listingId]);

  // ** Handlers
  const handleSelection = () => {
    if (checked) {
      selectionActions.removeSelected(listingId);
    } else {
      selectionActions.addSelected(listingId);
    }
  };

  const handleToggleBookmark = () => {
    if (isToggleBookmarkFetching) {
      return;
    }

    toggleBookmarkListing();
  };

  // ** Effects
  useEffect(() => {
    if (isToggleBookmarkFetching) {
      return;
    }

    if (isToggleBookmarkError) {
      router.replace('/500');
      return;
    }

    if (bookmarkData === true) {
      setBookmarks([...bookmarks, listingId]);
      return;
    }

    if (bookmarkData === false) {
      setBookmarks(bookmarks.filter((b) => b !== listingId));
      return;
    }

    if (isToggleBookmarkFetched && bookmarkData === undefined)
      // How you even reach here??!?!?!?!?!
      router.replace('/500');
  }, [isToggleBookmarkFetching]);

  return (
    <TableCell {...tableCellProps}>
      {isSm ? (
        <IconButton size="small" color="inherit">
          <MenuIcon />
        </IconButton>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          {bookmarked ? (
            <IconButton size="small" color="warning" onClick={handleToggleBookmark}>
              <BookmarkIcon />
            </IconButton>
          ) : (
            <IconButton size="small" color="warning" onClick={handleToggleBookmark}>
              <BookmarkBorderIcon />
            </IconButton>
          )}
          <IconButton
            size="small"
            sx={({ palette }) => ({
              color: palette.grey[700],
            })}
          >
            <ChatIcon />
          </IconButton>
          <Checkbox
            checked={checked}
            sx={({ palette }) => ({
              color: palette.grey[700],
              '&.Mui-checked': {
                color: palette.grey[700],
              },
            })}
            onChange={handleSelection}
          />
        </Box>
      )}
    </TableCell>
  );
};

export default ActionCell;
