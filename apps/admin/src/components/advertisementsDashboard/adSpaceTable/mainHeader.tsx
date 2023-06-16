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

interface Props {
  numSelected: number;
  active: boolean;
  onDelete: MouseEventHandler<HTMLDivElement>;
  onEdit: MouseEventHandler<HTMLDivElement>;
  onChangeActiveStatus: MouseEventHandler<HTMLDivElement>;
}

const MainHeader = ({
                      numSelected,
                      active,
                      onDelete,
                      onEdit,
                      onChangeActiveStatus,
                    }: Props) => {

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
          {active ? 'Active' : 'Inactive'} Ad-Spaces
        </Typography>
      )}
      {isElementSelected ? (
        <>
          <Tooltip title={active ? 'Make Inactive' : 'Make Active'} onClick={onChangeActiveStatus}>
            <IconButton>
              {active
                ? <MinusIcon fontSize='large' />
                : <PlusIcon fontSize='large' />}
            </IconButton>
          </Tooltip>
          {numSelected === 1
            ? <Tooltip title='Edit' onClick={onEdit}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            : null}
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
