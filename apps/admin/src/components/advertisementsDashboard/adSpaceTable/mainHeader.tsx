import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MinusIcon from '@mui/icons-material/Remove';
import PlusIcon from '@mui/icons-material/Add';
import { MouseEventHandler } from 'react';
import { Advertisment } from '@/utils/api/client/zod/advertisements';

interface Props {
  advertisements: { [key: string]: Advertisment };
  selected: readonly string[];
  onDelete: MouseEventHandler<HTMLDivElement>;
  onEdit: MouseEventHandler<HTMLDivElement>;
  onSetActive: MouseEventHandler<HTMLDivElement>;
  onSetInactive: MouseEventHandler<HTMLDivElement>;
}

const MainHeader = ({
                      advertisements,
                      selected,
                      onDelete,
                      onEdit,
                      onSetActive,
                      onSetInactive,
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
            selected.find(id => advertisements[id].active) &&
            <Tooltip title='Make Inactive' onClick={onSetInactive}>
              <IconButton>
                <MinusIcon fontSize='large' />
              </IconButton>
            </Tooltip>
          }
          {
            selected.find(id => !advertisements[id].active) &&
            <Tooltip title='Make Active' onClick={onSetActive}>
              <IconButton>
                <PlusIcon fontSize='large' />
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
      ) : null}
    </Toolbar>
  );
};

export default MainHeader;
