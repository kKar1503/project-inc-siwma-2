import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { MouseEvent } from 'react';
import { DataType } from '@/components/advertisementsDashboard/adSpaceTable/dataLayout';
import Button from '@mui/material/Button';

interface Props {
  row: DataType;
  index: number;
  isSelected: boolean;
  onSelect: (event: MouseEvent<unknown>, element: DataType) => void;
}

const ExternalLink = ({ link, display }: { link: string; display: string }) => {
  return (
    <Button onClick={()=>window.open(link,'_blank')}>{display}</Button>
  );
};

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
      onClick={(event) => onSelect(event, row)}
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
      <TableCell align='left'>{row.company}</TableCell>
      <TableCell align='left'><ExternalLink link={row.image} display='View Image' /></TableCell>
      <TableCell align='left'>{row.description}</TableCell>
      <TableCell align='left'><ExternalLink link={row.link} display={row.link} /></TableCell>
      <TableCell align='left'>{row.active ? 'YES' : 'NO'}</TableCell>
      <TableCell align='left'>{row.createdAt}</TableCell>
      <TableCell align='left'>{row.startDate}</TableCell>
      <TableCell align='left'>{row.endDate}</TableCell>
    </TableRow>
  );
};

export default RowBody;
