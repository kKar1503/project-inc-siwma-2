import { IconType } from 'react-icons';
import { Box, Typography } from '@mui/material';
import { useResponsiveness } from '@inc/ui';

export type AdminFigureProps = {
  title: string;
  value: string;
  color: string;
  icon: IconType;
};

const AdminFigure = ({ title, value, color, icon }: AdminFigureProps) => {
  const [isSm] = useResponsiveness(['sm']);
  const IconComponent = icon;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        px: '1.5rem',
        py: '1rem',
        backgroundColor: 'white',
        marginBottom: isSm ? 2 : 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant={isSm ? 'h5' : 'h4'} fontWeight="bold" color={color}>
          {value}
        </Typography>
        <Typography variant={isSm ? 'h6' : 'h5'}>{title}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: isSm ? '20%' : '30%',
        }}
      >
        <IconComponent
          style={{
            width: '100%',
            height: '100%',
          }}
          color={color}
        />
      </Box>
    </Box>
  );
};

export default AdminFigure;
