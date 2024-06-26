import React, { useEffect, useState } from 'react';
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
import { useRouter } from 'next/router';
import Spinner from '@/components/fallbacks/Spinner';

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
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [isSm] = useResponsiveness(['sm']);

  const [deleteUser, setDeleteUser] = useState<boolean>(false);
  const [deleteInvite, setDeleteInvite] = useState<boolean>(false);
  const [toggleUser, setToggleUser] = useState<boolean>(false);
  const [inviteUser, setInviteUser] = useState<boolean>(false);

  const queries = useQueries([
    {
      queryKey: 'companies',
      queryFn: fetchCompanies,
      refetchInterval: 300000,
    },
    {
      queryKey: 'users',
      queryFn: fetchUsers,
      refetchInterval: 300000,
    },
    {
      queryKey: 'invites',
      queryFn: fetchInvites,
      refetchInterval: 300000,
    },
  ]);

  const onErrorFn = (error: any) => {
    alert(error.statusText);
  };

  const { mutate: deleteUsers } = useMutation('deleteUsers', deleteUsersMutationFn, {
    onSuccess: () => {
      queries[1].refetch();
      setDeleteUser(true);
    },
    onError: onErrorFn,
  });

  const { mutate: toggleUsers } = useMutation('toggleUsers', toggleUsersMutationFn, {
    onSuccess: () => {
      queries[1].refetch();
      setToggleUser(true);
    },
    onError: onErrorFn,
  });

  const { mutate: deleteInvites } = useMutation('deleteInvites', deleteInvitesMutationFn, {
    onSuccess: () => {
      queries[2].refetch();
      setDeleteInvite(true);
    },
    onError: onErrorFn,
  });

  const { mutate: createInvite } = useMutation('createInvite', createInviteMutationFn, {
    onSuccess: () => {
      queries[2].refetch();
      setOpen(!open);
      setInviteUser(true);
    },
    onError: onErrorFn,
  });

  const isLoading = queries[0].isLoading || queries[1].isLoading || queries[2].isLoading;
  const isFetched = queries[0].isFetched && queries[1].isFetched && queries[2].isFetched;
  const isError = queries[0].isError || queries[1].isError || queries[2].isError;

  const companies = queries[0].data;
  const users = queries[1].data;
  const invites = queries[2].data;

  useEffect(() => {
    if (!isFetched) {
      return;
    }
    if (isError) {
      router.replace('/500');
      return;
    }
    if (queries[0] === undefined || !queries[1] === undefined || !queries[2] === undefined) {
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
        <Box
          sx={{
            width: isSm ? '100%' : '48%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            padding: 2,
            marginBottom: 2,
            backgroundColor: 'white',
          }}
        >
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
        </Box>
        <Box
          sx={{
            width: isSm ? '100%' : '48%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            padding: 2,
            marginBottom: 2,
            backgroundColor: 'white',
          }}
        >
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
            onClick={() => router.push('/invites/bulk')}
          >
            Send Invite
          </Button>
        </Box>
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
      <SuccessModal
        title="Successfully Invited"
        content="The user has been invited."
        open={inviteUser}
        setOpen={setInviteUser}
        buttonText="Return"
      />
    </Box>
  );
};

export default Page;
