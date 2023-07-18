import React, { useState } from 'react';
import AdminFigure from '@/components/AdminFigure';
import { AiOutlineUser } from 'react-icons/ai';
import { MdStorefront } from 'react-icons/md';
import CreateInviteModal from '@/components/modals/CreateInviteModal';
import RegisteredUsersTable from '@/components/tables/RegisteredUsersTable';
import PendingInvitesTable from '@/components/tables/PendingInvitesTable';
import { Box, Button, Grid, Typography, styled } from '@mui/material';
import { useResponsiveness } from '@inc/ui';
import { useQueries, useMutation } from 'react-query';
import fetchCompanies from '@/middlewares/fetchCompanies';
import fetchUsers from '@/middlewares/fetchUsers';
import fetchInvites from '@/middlewares/fetchInvites';
import apiClient from '@/utils/api/client/apiClient';
import { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { PostInviteRequestBody } from '@/utils/api/server/zod/invites';
import SuccessModal from '@/components/modals/SuccessModal';

const deleteInvitesMutationFn = async (emails: string[]) => {
  const promises = emails.map((email) => apiClient.delete(`/v1/invites/email/${email}`));
  await Promise.all(promises);
};

const toggleUsersMutationFn = async (ids: string[]) => {
  const promises = ids.map((id) => apiClient.patch(`/v1/users/${id}/enabled`));
  await Promise.all(promises);
};

const deleteUsersMutationFn = async (ids: string[]) => {
  const promises = ids.map((id) => apiClient.delete(`/v1/users/${id}`));
  await Promise.all(promises);
};

const createInviteMutationFn = async (data: PostInviteRequestBody) => {
  const response = await apiClient.post('/v1/invites', data);
  return response;
};

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSm] = useResponsiveness(['sm']);

  const [deleteUser, setDeleteUser] = useState<boolean>(false);
  const [deleteInvite, setDeleteInvite] = useState<boolean>(false);
  const [toggleUser, setToggleUser] = useState<boolean>(false);

  const queries = useQueries([
    {
      queryKey: 'companies',
      queryFn: fetchCompanies,
      refetchInterval: 50000,
    },
    {
      queryKey: 'users',
      queryFn: fetchUsers,
      refetchInterval: 50000,
    },
    {
      queryKey: 'invites',
      queryFn: fetchInvites,
      refetchInterval: 50000,
    },
  ]);

  const { mutate: deleteUsers } = useMutation('deleteUsers', deleteUsersMutationFn, {
    onSuccess: () => {
      queries[1].refetch();
      setDeleteUser(true);
    },
  });

  const { mutate: toggleUsers } = useMutation('toggleUsers', toggleUsersMutationFn, {
    onSuccess: () => {
      queries[1].refetch();
      setToggleUser(true);
    },
  });

  const { mutate: deleteInvites } = useMutation('deleteInvites', deleteInvitesMutationFn, {
    onSuccess: () => {
      queries[2].refetch();
      setDeleteInvite(true);
    },
  });

  const { mutate: createInvite } = useMutation('createInvite', createInviteMutationFn, {
    onSuccess: (response) => {
      queries[2].refetch();
      setOpen(!open);
      console.log(response);
    },
  });

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

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDeleteUsers = (rows: readonly BaseTableData[]) => {
    const uuids = rows.map((row) => row.id);
    deleteUsers(uuids as string[]);
    return [];
  };

  const handleToggleUsers = (toggled: boolean, rows: readonly BaseTableData[]) => {
    const uuids = rows.map((row) => row.id);
    toggleUsers(uuids as string[]);
  };

  const handleDeleteInvites = (rows: readonly BaseTableData[]) => {
    const emails = rows.map((row) => row.email);
    deleteInvites(emails as string[]);
    return [];
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
            onClick={handleClick}
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
        <PendingInvitesTable
          data={invites || []}
          companies={companies || []}
          onDelete={handleDeleteInvites}
        />
        <RegisteredUsersTable
          data={users || []}
          companies={companies || []}
          onToggle={handleToggleUsers}
          onDelete={handleDeleteUsers}
        />
      </Box>

      <CreateInviteModal
        data={companies || []}
        isOpen={open}
        setOpen={setOpen}
        onSubmit={createInvite}
      />
      <SuccessModal
        title="Successfully Deleted"
        content="Selected users have been successfully deleted"
        open={deleteUser}
        setOpen={setDeleteUser}
        buttonText="Return"
      />
      <SuccessModal
        title="Successfully Deleted"
        content="Selected Invites have been successfully deleted"
        open={deleteInvite}
        setOpen={setDeleteInvite}
        buttonText="Return"
      />
      <SuccessModal
        title="Successfully Toggled"
        content="Selected users have been successfully toggled"
        open={toggleUser}
        setOpen={setToggleUser}
        buttonText="Return"
      />
    </Box>
  );
};

export default Page;
