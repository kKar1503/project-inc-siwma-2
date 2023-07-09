import {
  Modal,
  Fade,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  styled,
  useTheme,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useResponsiveness } from '@inc/ui';
import { useMemo } from 'react';

export type CreateInviteModalProps = {
  data: any[];
  isOpen: boolean;
  setOpen: (val: boolean) => void;
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const CreateInviteModal = ({ data, isOpen, setOpen }: CreateInviteModalProps) => {
  const { palette, spacing } = useTheme();
  const [isXs, isSm, isMd] = useResponsiveness(['xs', 'sm', 'md']);

  const modalStyles = useMemo(() => {
    if (isXs) {
      return {
        modalWidth: {
          width: '80%',
        },
      };
    }
    if (isSm) {
      return {
        modalWidth: {
          width: '75%',
        },
      };
    }
    if (isMd) {
      return {
        modalWidth: {
          width: '50%',
        },
      };
    }
    return {
      modalWidth: {
        width: '40%',
      },
    };
  }, [isXs, isSm, isMd]);

  const handleClose = () => {
    setOpen(!isOpen);
  };

  return (
    <Modal
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      open={isOpen}
      onClose={handleClose}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            borderRadius: '15px',
            position: 'relative',
            backgroundColor: palette.common.white,
            px: '2rem',
            py: '1rem',
            ...modalStyles?.modalWidth,
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '0.5rem',
              right: '1.5rem',
              ':hover': {
                cursor: 'pointer',
              },
            }}
            onClick={handleClose}
          >
            <CloseIcon color="error" />
          </IconButton>
          <Typography variant="h5">Create an individual invite</Typography>
          <Typography sx={{ mb: 2 }} variant="subtitle1">
            Invite an individual user to the system
          </Typography>
          <StyledTextField label="Name" variant="outlined" />
          <StyledTextField label="Email" variant="outlined" />
          <FormControl sx={{ mb: spacing(2), width: '100%' }}>
            <InputLabel>Company</InputLabel>
            <Select input={<OutlinedInput label="Company" />}>
              {data.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <StyledTextField label="Mobile Number" variant="outlined" />
          <Button
            sx={{
              width: '100%',
              py: '0.5rem',
              my: '1rem',
            }}
            variant="outlined"
          >
            Send Invite
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateInviteModal;
