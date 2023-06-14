import { Checkbox, Divider, TableCell, TableHead, TableRow } from '@mui/material';

export interface Column {
  key: string;
  label: string;
}

type BaseTableHeadProps = {
  columns: Column[];
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
};

const BaseTableHead = (props: BaseTableHeadProps) => {
  const { columns, numSelected, onSelectAllClick, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all rows',
            }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell key={column.key} align="left">
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default BaseTableHead;
