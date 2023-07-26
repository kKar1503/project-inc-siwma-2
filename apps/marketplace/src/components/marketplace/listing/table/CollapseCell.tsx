// ** React Imports
import React from 'react';

// ** MUI Imports
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface CollapseCellProps {
  open: boolean;
  onChange: () => void;
}

const CollapseCell = (props: CollapseCellProps) => {
  // ** Props
  const { open, onChange } = props;

  return (
    <TableCell align="center" sx={{ width: 66, minWidth: 66 }}>
      <IconButton aria-label="expand row" size="small" onClick={() => onChange()}>
        {open ? (
          <KeyboardArrowUpIcon sx={({ palette }) => ({ color: palette.grey[700] })} />
        ) : (
          <KeyboardArrowDownIcon sx={({ palette }) => ({ color: palette.grey[700] })} />
        )}
      </IconButton>
    </TableCell>
  );
};

export default CollapseCell;
