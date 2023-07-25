// ** React Imports
import React from 'react';

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

// ** Action Cell Prop Types
export interface ActionCellProps {
  isBookmarked: boolean;
}

const ActionCell = (props: ActionCellProps & TableCellProps) => {
  // ** Props
  const { isBookmarked, ...tableCellProps } = props;

  // ** Hooks
  const [isSm] = useResponsiveness(['sm']);

  return (
    <TableCell {...tableCellProps}>
      {isSm ? (
        <IconButton size="small" color="inherit">
          <MenuIcon />
        </IconButton>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          {isBookmarked ? (
            <IconButton size="small" color="warning">
              <BookmarkIcon />
            </IconButton>
          ) : (
            <IconButton size="small" color="warning">
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
            sx={({ palette }) => ({
              color: palette.grey[700],
              '&.Mui-checked': {
                color: palette.grey[700],
              },
            })}
          />
        </Box>
      )}
    </TableCell>
  );
};

export default ActionCell;
