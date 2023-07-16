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
  Autocomplete,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useResponsiveness } from '@inc/ui';
import { ReactNode, useMemo, useState } from 'react';
import { Company } from '@/utils/api/client/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validateEmail, validateName } from '@/utils/api/validate';
import { PostInviteRequestBody } from '@/utils/api/server/zod/invites';

export type CreateInviteModalProps = {
  data: Company[];
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  onSubmit: (data: PostInviteRequestBody) => void;
};

type Inputs = {
  name: string;
  email: string;
  company: string;
};

const ErrorText = ({ children }: { children: ReactNode }) => (
  <Typography variant="body1" color="red" display="inline">
    {children}
  </Typography>
);

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const CreateInviteModal = ({ data, isOpen, setOpen, onSubmit }: CreateInviteModalProps) => {
  const { palette, spacing } = useTheme();
  const [error, setError] = useState<Error | null>(null);
  const [isXs, isSm, isMd] = useResponsiveness(['xs', 'sm', 'md']);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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
    reset();
  };

  const submitHandler: SubmitHandler<Inputs> = (formData) => {
    try {
      validateName(formData.name);
      validateEmail(formData.email);
      setError(null);
      const companyId = data.find((element) => element.name === formData.company)?.id;
      if (!companyId) return;
      onSubmit({ name: formData.name, email: formData.email, company: companyId });
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) setError(error);
    }
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
          <form onSubmit={handleSubmit(submitHandler)}>
            <StyledTextField
              label="Name"
              variant="outlined"
              {...register('name', { required: true })}
            />
            <StyledTextField
              label="Email"
              variant="outlined"
              type="email"
              {...register('email', { required: true })}
            />
            <Autocomplete
              sx={{
                marginBottom: spacing(2),
              }}
              options={data}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Company"
                  {...register('company', { required: true })}
                />
              )}
            />
            {errors.name && <ErrorText>Name is required!</ErrorText>}
            {errors.email && <ErrorText> Email is required!</ErrorText>}
            {errors.company && <ErrorText> Company is required!</ErrorText>}
            {error && <ErrorText>{error.message}</ErrorText>}
            <Button
              type="submit"
              sx={{
                width: '100%',
                py: '0.5rem',
                my: '1rem',
              }}
              variant="outlined"
            >
              Send Invite
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateInviteModal;
