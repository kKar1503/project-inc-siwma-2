import EditUserForm from '@/components/forms/EditUserForm';
import { Typography, Box, Divider, Button } from '@mui/material';
import { useResponsiveness } from '@inc/ui';
import { useRouter } from 'next/router';
import { useQueries } from 'react-query';
import fetchCompanies from '@/middlewares/fetchCompanies';
import fetchUser from '@/middlewares/fetchUser';
import WarningModal from '@/components/modals/WarningModal';
import { useEffect, useState } from 'react';
import SuccessModal from '@/components/modals/SuccessModal';
import Spinner from '@/components/fallbacks/Spinner';
import { BaseError } from '@inc/errors';

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

  const isLoading = queries[0].isLoading || queries[1].isLoading;
  const isFetched = queries[0].isFetched && queries[1].isFetched;
  const isError = queries[0].isError || queries[1].isError;

  const companies = queries[0].data;
  const user = queries[1].data;

  useEffect(() => {
    if (!isFetched) {
      return;
    }
    if (isError) {
      if (
        'status' in (queries[0].error as BaseError) &&
        (queries[0].error as BaseError).status === 404
      ) {
        router.replace('/404');
        return;
      }
      router.replace('/500');
      return;
    }
    if (queries[0].data === undefined || queries[1].data === undefined) {
      router.replace('/500');
    }
  }, [queries, isFetched]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spinner />
      </Box>
    );
  }

  const openModal = (modal: string) => {
    if (modal === 'success') setOpenSuccess(true);
    if (modal === 'warning') setOpenWarning(true);
    if (modal === 'email') setOpenSent(true);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
            <Typography variant="h6">Edit user details manually below</Typography>
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
        />
        <SuccessModal
          title="Email Sent"
          content="Password reset email has been sent."
          buttonText="Continue"
          open={openSent}
          setOpen={setOpenSent}
        />
      </Box>
    </Box>
  );
};

export default EditUser;
