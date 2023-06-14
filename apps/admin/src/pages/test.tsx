import AdminFigure from '@/components/AdminFigure';
import { Box } from '@mui/material';
import { AiOutlineUser } from 'react-icons/ai';

const Page = () => (
  <div>
    <Box
      sx={{
        width: '250px',
        m: 2,
      }}
    >
      <AdminFigure title="Registered Users" value="21" color="#3a86ff" icon={AiOutlineUser} />
    </Box>

    <Box
      sx={{
        width: '250px',
        m: 2,
      }}
    >
      <AdminFigure title="Pending Invites" value="4" color="#fee440" icon={AiOutlineUser} />
    </Box>
  </div>
);

export default Page;
