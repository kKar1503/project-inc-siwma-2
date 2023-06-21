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
        px: '1rem',
        py: '0.5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant={isSm ? 'h3' : 'h2'} color={color}>
          {value}
        </Typography>
        <Typography variant={isSm ? 'subtitle2' : 'subtitle1'}>{title}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40%',
          height: '40%',
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
