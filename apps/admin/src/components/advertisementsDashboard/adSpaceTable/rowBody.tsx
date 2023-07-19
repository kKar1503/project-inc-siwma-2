import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { MouseEvent } from 'react';
import Button from '@mui/material/Button';
import { Advertisment } from '@/utils/api/client/zod/advertisements';

interface Props {
  row: Advertisment & { companyName: string };
  index: number;
  isSelected: boolean;
  onSelect: (event: MouseEvent<unknown>, element: Advertisment) => void;
}

const ExternalLink = ({ link, display, displayInvalid }: {
  link: string | null;
  display: string,
  displayInvalid?: string
}) => link ? (
  <Button onClick={() => window.open(link, '_blank')}>{display}</Button>
) : (
  <Button disabled>{displayInvalid}</Button>
);

const parseDate = (date: string | undefined) => {
  if (!date) return 'unknown';
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
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
      onClick={(event: MouseEvent<unknown>) => onSelect(event, row)}
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
      <TableCell align='left'>{row.companyName}</TableCell>
      <TableCell align='left'><ExternalLink link={`https://s3.karlok.dev/${row.image}`} display='View Image'
                                            displayInvalid='No Image' /></TableCell>
      <TableCell align='left'>{row.description}</TableCell>
      <TableCell align='left'><ExternalLink link={row.link} display={row.link} displayInvalid='No Link' /></TableCell>
      <TableCell align='left'>{row.active ? 'YES' : 'NO'}</TableCell>
       <TableCell align='left'>{row.createdAt}</TableCell>
      <TableCell align='left'>{parseDate(row.startDate)}</TableCell>
      <TableCell align='left'>{parseDate(row.endDate)}</TableCell>
    </TableRow>
  );
};

export default RowBody;
