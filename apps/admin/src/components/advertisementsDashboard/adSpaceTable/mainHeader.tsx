import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlusIcon from '@mui/icons-material/Add';
import { MouseEventHandler } from 'react';
import { Advertisment } from '@/utils/api/client/zod/advertisements';

interface Props {
  advertisements: { [key: string]: Advertisment };
  selected: readonly string[];
  onDelete: MouseEventHandler<HTMLDivElement>;
  onEdit: MouseEventHandler<HTMLDivElement>;
  onAdd: MouseEventHandler<HTMLDivElement>;
  refetchData: () => void;
  onSetActive: MouseEventHandler<HTMLDivElement>;
  onSetInactive: MouseEventHandler<HTMLDivElement>;
}

const MainHeader = ({
                      advertisements,
                      selected,
                      onDelete,
                      onAdd,
                      onEdit,
                      onSetActive,
                      onSetInactive,
                      refetchData,
                    }: Props) => {

  const numSelected = selected.length;
  const isElementSelected = numSelected > 0;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(isElementSelected && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {isElementSelected ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Ad-Spaces
        </Typography>
      )}
      {isElementSelected ? (
        <>
          {
            selected.find(id => !advertisements[id].active) &&
            <Tooltip title='Make Active' onClick={onSetActive}>
              <IconButton>
                <VisibilityIcon fontSize='large' />
              </IconButton>
            </Tooltip>
          }
          {
            selected.find(id => advertisements[id].active) &&
            <Tooltip title='Make Inactive' onClick={onSetInactive}>
              <IconButton>
                <VisibilityOffIcon fontSize='large' />
              </IconButton>
            </Tooltip>
          }
          {numSelected === 1 && <Tooltip title='Edit' onClick={onEdit}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>}
          <Tooltip title='Delete' onClick={onDelete}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
        )
        : <>
          <Tooltip title='Create Advertisement' onClick={onAdd}>
            <IconButton>
              <PlusIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Refresh Data' onClick={refetchData}>
            <IconButton>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </>}
    </Toolbar>
  );
};

export default MainHeader;
