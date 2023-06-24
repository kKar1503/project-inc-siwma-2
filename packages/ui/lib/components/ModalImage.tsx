import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import CardMedia from '@mui/material/CardMedia';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export type DialogProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  title: string;
  description: string;
  img: string;
};

const ModalImage = (props: DialogProps) => {
  const { open, setOpen, title, description, img } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={({ spacing }) => ({ m: spacing(0), display: 'flex' })}>
          <Box sx={{ width: 9 / 10 }}>{title}</Box>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              width: 1 / 10,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <CardMedia component="img" height="250" image={img} />
          <Typography fontWeight="bold" sx={({ spacing }) => ({ mt: spacing(2) })}>
            DESCRIPTION
          </Typography>
          <Typography gutterBottom>{description}</Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default ModalImage;
