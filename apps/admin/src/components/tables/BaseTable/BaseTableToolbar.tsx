import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
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
  subHeading?: string;
  selectedRows: readonly BaseTableData[];
  onToggle?: ToggleEventHandler;
  toggleColumn?: string;
  toolbarButtons?: React.ReactNode;
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
  const { heading, subHeading, selectedRows, onToggle, toggleColumn, toolbarButtons, onEdit, onDelete } = props;

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
        flexGrow: 0,
        minHeight: subHeading ? '88px !important' : undefined,
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Box display="flex" justifyContent="space-between" width='100%'>
          <Box>
            <Typography
              sx={{ flex: 1 }}
              variant="h5"
              id="tableTitle"
              fontWeight="medium"
              marginBottom="4px"
            >
              {heading}
            </Typography>
            {subHeading ?? (
              <Typography variant="body2" id="tableSubTitle">
                {subHeading}
              </Typography>
            )}
          </Box>
          {toolbarButtons}
        </Box>
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
