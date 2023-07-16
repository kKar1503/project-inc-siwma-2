import EditUserForm from '@/components/forms/EditUserForm';
import { Typography, Box, Divider, Button } from '@mui/material';
import { useResponsiveness } from '@inc/ui';
import { useRouter } from 'next/router';
import { useQueries, useMutation, useQuery } from 'react-query';
import fetchCompanies from '@/middlewares/fetchCompanies';
import fetchUser from '@/middlewares/fetchUser';

const EditUser = () => {
  const [isXs, isSm] = useResponsiveness(['xs', 'sm']);
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

  const goBack = () => {
    router.push('/users-management');
  };

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
            onClick={goBack}
          >
            Go Back
          </Button>
        )}
      </Box>

      <Divider />
      <EditUserForm user={user} companies={companies || []} returnFn={goBack} />
    </Box>
  );
};

export default EditUser;
