import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const NegotiableBadge = () => {
  const { t } = useTranslation();

  return (
    <Chip
      sx={({ spacing, palette }) => ({
        mr: spacing(1),
        bgcolor: palette.info[600],
        fontWeight: 500,
        color: palette.common.white,
      })}
      label={t('Negotiable')}
    />
  );
};

export default NegotiableBadge;
