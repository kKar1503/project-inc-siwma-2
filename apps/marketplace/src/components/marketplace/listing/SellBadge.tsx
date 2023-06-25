import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SellBadge = () => {
  const { t } = useTranslation();

  return (
    <Chip
      sx={({ spacing, palette }) => ({
        mr: spacing(1),
        bgcolor: palette.error[500],
        fontWeight: 'bold',
        color: palette.common.white,
      })}
      label={t('Selling')}
    />
  );
};

export default SellBadge;
