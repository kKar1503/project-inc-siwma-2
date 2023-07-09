import React, { useState } from 'react';
import AdminFigure from '@/components/AdminFigure';
import { AiOutlineUser } from 'react-icons/ai';
import { MdStorefront } from 'react-icons/md';
import CreateInviteModal from '@/components/modals/CreateInviteModal';
import RegisteredUsersTable from '@/components/tables/RegisteredUsersTable';
import PendingInvitesTable from '@/components/tables/PendingInvitesTable';
import { Box, Button, Grid, Typography, styled } from '@mui/material';
import { useResponsiveness } from '@inc/ui';

const CompanyData = [
  {
    id: '1',
    name: 'AIK LIAN METAL & GLAZING PTE.LTD.',
    website: 'https://www.sgpbusiness.com/company/Aik-Lian-Metal-Glazing-Pte-Ltd',
    bio: 'AIK LIAN METAL & GLAZING PTE. LTD. (the "Company") is a Exempt Private Company Limited by Shares, incorporated on 28 July 2011 (Thursday) in Singapore . The address of the Company\'s registered office is at the E9 PREMIUM building. The Company current operating status is live and has been operating for 11 years. This Company\'s principal activity is other construction installation n.e.c. with metal product services n.e.c. as the secondary activity.',
    image: '001892c0b1d1a71b38ae8e6d8aaf5dd7.jpeg',
    visible: true,
    comments:
      "The SIWMA website has really automated some of our company's processes. We now spend less time doing manual work. It's making advertising and selling our metals very easy for us.",
    createdAt: '2023-07-06T16:29:41.562Z',
  },
  {
    id: '2',
    name: 'BOON CHANG STRUCTURE PTE.LTD.',
    website: 'https://www.boonchangstructure.com.sg/page02.html',
    bio: 'BOON CHANG STRUCTURE PTE LTD was incorporated on 9 June 1994 (Thursday) as a Exempt Private Company Limited by Shares in Singapore',
    image: '001892c0b1d1aa9e73b2febc50186df7.jpeg',
    visible: true,
    comments:
      'SIWMA is the firm to work with if you want to keep up to high standards. The professional workflows they stick to result in exceptional quality.',
    createdAt: '2023-07-06T16:29:41.562Z',
  },
  {
    id: '3',
    name: 'Hock Seng Hoe Metal Company Pte Ltd',
    website: 'https://www.hshmetal.com/',
    bio: 'HOCK SENG HOE METAL COMPANY was established in Singapore in Year 2009 and is now a reputable structural steel provider. Our core business includes providing quality steel materials for the construction, shipyard, oil and gas and the offshore marine industries.',
    image: '001892c0b1d1ae19689d8383b09e5b04.jpeg',
    visible: true,
    comments:
      'The system has produced a significant competitive advantage in the industry thanks to SIWMA well-thought opinions',
    createdAt: '2023-07-06T16:29:41.562Z',
  },
  {
    id: '4',
    name: 'Kian Huat Metal',
    website: 'https://kianhuatmetal.com/',
    bio: 'Kian Huat Metal is the leading distributor of Aluminium and Stainless Steel products, recognized for its reliability, efficiency, and commitment to quality. With over 30 years of experience in the industry, the Company has a wide distribution network that spans over 20 countries in the Asia Pacific region.\n\nKian Huat Metal offers an extensive range of Aluminium and Stainless Steel products, sourced worldwide with major footprints in China, Indonesia, Thailand, and Malaysia.',
    image: 'logo-Placeholder.jpg',
    visible: false,
    comments:
      'They are very sharp and have a high-quality team. We expect quality from people, and they have the kind of team we can work with. They were upfront about everything that needed to be done.',
    createdAt: '2023-07-06T16:29:41.562Z',
  },
  {
    id: '5',
    name: 'Global Metal International',
    website: 'https://globalmetal.com.sg/',
    bio: 'Global Metal International (GMI) is a steel based stockist with focus on Stainless Steel products in Singapore, supplying regional markets in South East Asia, to both retail and project business. We are also developing our trading arm in Stainless Steel and non ferrous, trade indent material for productions or projects.',
    image: '001892c0b1d1b2dd4036527beca2f802.jpeg',
    visible: true,
    comments:
      "We are impressed by SIWMA's prices, especially for the project we wanted to do and in comparison to the quotes we received from a lot of other companies.",
    createdAt: '2023-07-06T16:29:41.562Z',
  },
];

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSm] = useResponsiveness(['sm']);

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
            value="20"
            icon={MdStorefront}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AdminFigure title="Registered Users" color="#34d399" value="20" icon={AiOutlineUser} />
        </Grid>
        {isSm && <Grid item sm />}
        <Grid item xs={12} sm={6} md={4}>
          <AdminFigure title="Pending Invites" color="#facc15" value="20" icon={AiOutlineUser} />
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

      <CreateInviteModal data={CompanyData} isOpen={open} setOpen={setOpen} />
    </Box>
  );
};

export default Page;
