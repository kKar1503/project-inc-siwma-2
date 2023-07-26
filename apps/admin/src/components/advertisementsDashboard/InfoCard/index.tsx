import { IconType } from 'react-icons';
import { Box, Typography } from '@mui/material';
import { useResponsiveness } from '@inc/ui';
import ModuleBase from 'src/components/advertisementsDashboard/moduleBase';

export type InfoCardProps = {
  title: string;
  value: string;
  color: string;
  icon: unknown;
  scale?: string;
};

const InfoCard = (
  {
    title,
    value,
    color,
    icon,
    scale = '50%',
  }: InfoCardProps) => {
  const [isSm] = useResponsiveness(['sm']);
  const IconComponent = icon as IconType;
  return (
    <ModuleBase>
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
            width: scale,
            height: scale,
          }}
          color={color}
        />
      </Box>
    </ModuleBase>
  );
};

export default InfoCard;
