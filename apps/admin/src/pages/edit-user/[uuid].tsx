import EditUserForm from '@/components/forms/EditUserForm';
import { Typography, Box, Divider, Button } from '@mui/material';
import { useResponsiveness } from '@inc/ui';

const EditUser = () => {
  const [isXs, isSm] = useResponsiveness(['xs', 'sm']);
  return (
    <Box
      sx={{
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        backgroundColor: 'white',
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSm ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isSm ? 'normal' : 'center',
          marginBottom: 2,
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="h5">Edit User</Typography>
          <Typography variant="h6">Edit user details manullay below</Typography>
        </Box>
        {(isXs || isSm) && (
          <Button
            sx={{
              width: '100px',
            }}
            variant="contained"
          >
            Go Back
          </Button>
        )}
      </Box>

      <Divider />
      <EditUserForm />
    </Box>
  );
};

export default EditUser;
