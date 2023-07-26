import { Modal, Fade, Box, Typography, Button, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useResponsiveness } from '@inc/ui';
import { ReactNode, useMemo, useState } from 'react';
import { Company } from '@/utils/api/client/zod';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { validateEmail, validateName, validatePhone } from '@/utils/api/validate';
import { PostInviteRequestBody } from '@/utils/api/server/zod/invites';
import { FormInputGroup, FormSearchDropdown, FormTextInput } from '@/components/forms';

export type CreateInviteModalProps = {
  data: Company[];
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  onSubmit: (data: PostInviteRequestBody) => void;
};

type Inputs = {
  name: string;
  email: string;
  company: { label: string; value: string };
  mobileNumber: string | undefined;
};

const ErrorText = ({ children }: { children: ReactNode }) => (
  <Typography variant="body1" color="red" display="inline">
    {children}
  </Typography>
);

const parseOptions = (data: Company[]) =>
  data.map((company) => ({ label: company.name, value: company.id }));

const CreateInviteModal = ({ data, isOpen, setOpen, onSubmit }: CreateInviteModalProps) => {
  const { palette, spacing } = useTheme();
  const [error, setError] = useState<Error | null>(null);
  const [isXs, isSm, isMd] = useResponsiveness(['xs', 'sm', 'md']);
  const companiesOptions = parseOptions(data);

  const formHook = useForm<Inputs>({
    defaultValues: {
      company: companiesOptions[0],
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = formHook;

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
    setError(null);
    reset();
  };

  const submitHandler: SubmitHandler<Inputs> = (data: Inputs) => {
    try {
      validateName(data.name);
      validateEmail(data.email);
      if (data.mobileNumber) validatePhone(data.mobileNumber);
      setError(null);
      const inviteData = {
        name: data.name,
        email: data.email,
        company: data.company.value,
        mobileNumber: data.mobileNumber || undefined,
      };
      onSubmit(inviteData);
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
            <FormProvider {...formHook}>
              <FormInputGroup label="Name" name="name" required>
                <FormTextInput label="Name" name="name" />
              </FormInputGroup>
              <FormInputGroup label="Email" name="email" required>
                <FormTextInput label="Email" name="email" />
              </FormInputGroup>
              <FormInputGroup label="Company" name="company" required>
                <FormSearchDropdown options={companiesOptions} label="Company" name="company" />
              </FormInputGroup>
              <FormInputGroup label="Mobile Number" name="mobileNumber">
                <FormTextInput label="Mobile Number" name="mobileNumber" />
              </FormInputGroup>
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
            </FormProvider>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateInviteModal;
