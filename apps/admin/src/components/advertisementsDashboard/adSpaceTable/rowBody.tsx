import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { MouseEvent } from 'react';
import { DataType } from '@/components/advertisementsDashboard/adSpaceTable/dataLayout';

interface Props {
  row: DataType;
  index: number;
  isSelected: boolean;
  onSelect: (event: MouseEvent<unknown>, name: string) => void;
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
      onClick={(event) => onSelect(event, row.id)}
      role='checkbox'
      aria-checked={isSelected}
      tabIndex={-1}
      key={row.id}
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
      <TableCell align='left'>{row.user}</TableCell>
      <TableCell align='left'>{row.email}</TableCell>
      <TableCell align='left'>{row.company}</TableCell>
      <TableCell align='left'>{row.mobileNumber}</TableCell>
    </TableRow>
  );
};

export default RowBody;
