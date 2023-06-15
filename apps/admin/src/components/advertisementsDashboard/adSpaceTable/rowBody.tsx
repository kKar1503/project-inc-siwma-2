import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import { Data } from '@/components/advertisementsDashboard/adSpaceTable/utils';

interface Props {
  row: Data;
  index: number;
  isSelected: boolean;
  onSelect: (event: React.MouseEvent<unknown>, name: string) => void;
}

const RowBody = ({
                   row,
                   index,
                   isSelected,
                   onSelect,
                 }: Props) => {

  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <TableRow
      hover
      onClick={(event) => onSelect(event, row.name)}
      role='checkbox'
      aria-checked={isSelected}
      tabIndex={-1}
      key={row.name}
      selected={isSelected}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell padding='checkbox'>
        <Checkbox
          color='primary'
          checked={isSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      <TableCell
        id={labelId}
        align='left'
      >
        {row.name}
      </TableCell>
      <TableCell align='left'>{row.calories}</TableCell>
      <TableCell align='left'>{row.fat}</TableCell>
      <TableCell align='left'>{row.carbs}</TableCell>
      <TableCell align='left'>{row.protein}</TableCell>
    </TableRow>
  );
};

export default RowBody;
