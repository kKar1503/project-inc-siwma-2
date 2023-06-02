import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';

const CloseButton = ({ id }: any) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton
      size="small"
      aria-label="close"
      onClick={() => {
        closeSnackbar(id);
      }}
      sx={({ spacing, zIndex }) => ({
        position: 'fixed',
        top: spacing(2),
        right: spacing(3),
        width: '0px',
        zIndex: zIndex.snackbar,
      })}
    >
      <CloseIcon fontSize="small" sx={{ color: '#000' }} />
    </IconButton>
  );
};

export default CloseButton;
