import React, { useState } from 'react';
import AdminFigure from '@/components/AdminFigure';
import { AiOutlineUser } from 'react-icons/ai';
import { MdStorefront } from 'react-icons/md';
import CreateInviteModal from '@/components/modals/CreateInviteModal';
import RegisteredUsersTable from '@/components/tables/RegisteredUsersTable';
import PendingInvitesTable from '@/components/tables/PendingInvitesTable';
import { Box, Button, Grid, Typography, styled } from '@mui/material';
import { useResponsiveness } from '@inc/ui';
import { useQueries } from 'react-query';
import fetchCompanies from '@/middlewares/fetchCompanies';
import fetchUsers from '@/middlewares/fetchUsers';
import fetchInvites from '@/middlewares/fetchInvites';

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSm] = useResponsiveness(['sm']);

  const queries = useQueries([
    {
      queryKey: 'companies',
      queryFn: fetchCompanies,
    },
    {
      queryKey: 'users',
      queryFn: fetchUsers,
    },
    {
      queryKey: 'invites',
      queryFn: fetchInvites,
    },
  ]);

  const companies = queries[0].data;
  const users = queries[1].data;
  const invites = queries[2].data;

  const InviteBox = styled('div')(({ theme }) => ({
    width: isSm ? '100%' : '48%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }));

  const handleOnClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Grid container columnSpacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <AdminFigure
            title="Registered Companies"
            color="#2563eb"
            value={companies ? companies.length.toString() : '0'}
            icon={MdStorefront}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AdminFigure
            title="Registered Users"
            color="#34d399"
            value={users ? users.length.toString() : '0'}
            icon={AiOutlineUser}
          />
        </Grid>
        {isSm && <Grid item sm />}
        <Grid item xs={12} sm={6} md={4}>
          <AdminFigure
            title="Pending Invites"
            color="#facc15"
            value={invites ? invites.length.toString() : '0'}
            icon={AiOutlineUser}
          />
        </Grid>
        {isSm && <Grid item sm />}
      </Grid>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isSm ? 'column' : 'row',
          justifyContent: 'space-between',
          marginY: 2,
        }}
      >
        <InviteBox>
          <Typography variant="h5">Create an individual Invite</Typography>
          <Typography variant="body1">Invite an individual user to the system</Typography>
          <Button
            sx={{
              width: '100%',
              marginTop: 2,
            }}
            variant="outlined"
            onClick={handleOnClick}
          >
            Send Invite
          </Button>
        </InviteBox>
        <InviteBox>
          <Typography variant="h5">Bulk invite users</Typography>
          <Typography variant="body1">
            Invite multiple users at once through a file import
          </Typography>
          <Button
            sx={{
              width: '100%',
              marginTop: 2,
            }}
            variant="outlined"
          >
            Send Invite
          </Button>
        </InviteBox>
      </Box>

      <Box
        sx={{
          marginTop: 2,
        }}
      >
        <PendingInvitesTable />
        <RegisteredUsersTable />
      </Box>

      <CreateInviteModal data={companies || []} isOpen={open} setOpen={setOpen} />
    </Box>
  );
};

export default Page;
