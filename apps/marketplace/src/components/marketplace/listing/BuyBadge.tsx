import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const BuyBadge = () => {
  const { t } = useTranslation();
  return (
    <Chip
      sx={({ spacing, palette }) => ({
        mr: spacing(1),
        bgcolor: palette.secondary[500],
        fontWeight: 'bold',
        color: palette.common.white,
      })}
      label={t('Buying')}
    />
  );
};

export default BuyBadge;
