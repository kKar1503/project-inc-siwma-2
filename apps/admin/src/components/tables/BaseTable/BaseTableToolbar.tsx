import { alpha } from '@mui/material/styles';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import type { BaseTableData } from './BaseTable';

type ToggleEventHandler<T = HTMLButtonElement> = (
  event: React.MouseEvent<T>,
  toggled: boolean
) => void;

type BaseTableToolbarProps = {
  heading: string;
  selectedRows: readonly BaseTableData[];
  onToggle?: ToggleEventHandler;
  toggleColumn?: string;
  onEdit?: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
};

function selectedRowsAreEnabled(selectedRows: readonly BaseTableData[]) {
  return selectedRows.every((row) => row.enabled === true);
}

function selectedRowsAreDisabled(selectedRows: readonly BaseTableData[]) {
  return selectedRows.every((row) => row.enabled === false);
}

const BaseTableToolbar = (props: BaseTableToolbarProps) => {
  // Desctructure props
  const { heading, selectedRows, onToggle, toggleColumn, onEdit, onDelete } = props;

  // Get number of selected rows
  const numSelected = selectedRows.length;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          {heading}
        </Typography>
      )}
      {numSelected > 0 && (
        <>
          {onToggle && toggleColumn && (
            <Tooltip title="Toggle">
              <IconButton
                onClick={(e) => onToggle(e, !selectedRowsAreEnabled(selectedRows))}
                disabled={
                  !selectedRowsAreEnabled(selectedRows) && !selectedRowsAreDisabled(selectedRows)
                }
              >
                {
                  /**
                   * If all selected rows are enabled, show the remove icon.
                   * If all selected rows are disabled, show the add icon.
                   */
                  selectedRowsAreEnabled(selectedRows) ? <RemoveIcon /> : <AddIcon />
                }
              </IconButton>
            </Tooltip>
          )}
          {onEdit && (
            <Tooltip title="Edit">
              <IconButton onClick={onEdit} disabled={numSelected > 1}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Delete">
              <IconButton onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
    </Toolbar>
  );
};

export default BaseTableToolbar;
