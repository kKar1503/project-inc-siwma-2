import { Checkbox, Divider, TableCell, TableHead, TableRow } from '@mui/material';

export interface Header {
  key: string;
  label: string;
  replace?: {
    [key: string]: React.ReactNode;
  };
}

type BaseTableHeadProps = {
  columns: Header[];
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  disabled?: boolean;
};

const BaseTableHead = (props: BaseTableHeadProps) => {
  const { columns, numSelected, onSelectAllClick, rowCount, disabled } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ backgroundColor: 'white' }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all rows',
            }}
            disabled={disabled}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell key={column.key} align="left" sx={{ backgroundColor: 'white' }}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default BaseTableHead;
