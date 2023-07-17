import EditUserForm from '@/components/forms/EditUserForm';
import { Typography, Box, Divider, Button } from '@mui/material';
import { useResponsiveness } from '@inc/ui';
import { useRouter } from 'next/router';
import { useQueries } from 'react-query';
import fetchCompanies from '@/middlewares/fetchCompanies';
import fetchUser from '@/middlewares/fetchUser';
import WarningModal from '@/components/modals/WarningModal';
import { useState } from 'react';
import SuccessModal from '@/components/modals/SuccessModal';

const EditUser = () => {
  const [isXs, isSm] = useResponsiveness(['xs', 'sm']);
  const [openWarning, setOpenWarning] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openSent, setOpenSent] = useState<boolean>(false);
  const router = useRouter();
  const { uuid } = router.query;

  const queries = useQueries([
    { queryKey: 'getCompanies', queryFn: fetchCompanies },
    {
      queryKey: ['getUser', uuid],
      queryFn: () => fetchUser(uuid as string),
      enabled: uuid !== undefined,
    },
  ]);

  const companies = queries[0].data;
  const user = queries[1].data;

  const openModal = (modal: string) => {
    if (modal === 'success') setOpenSuccess(true);
    if (modal === 'warning') setOpenWarning(true);
    if (modal === 'email') setOpenSent(true);
  };

  return (
    <Box
      sx={{
        marginX: 1,
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
            onClick={() => openModal('warning')}
          >
            Go Back
          </Button>
        )}
      </Box>

      <Divider />
      <EditUserForm user={user} companies={companies || []} openModal={openModal} />
      <WarningModal open={openWarning} setOpen={setOpenWarning} path="/users-management" />
      <SuccessModal
        title="Details Updated"
        content="User details has been updated"
        buttonText="Continue"
        open={openSuccess}
        setOpen={setOpenWarning}
        path="/users-managemnt"
      />
      <SuccessModal
        title="Email Sent"
        content="Password reset email has been sent."
        buttonText="Continue"
        open={openSent}
        setOpen={setOpenSent}
      />
    </Box>
  );
};

export default EditUser;
