import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

/**
 * Loading spinner
 */
const Spinner = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'inline-block',
        borderRadius: '9999px',
        borderWidth: '4px',
        borderColor: 'currentColor',
        borderStyle: 'solid',
        width: '2rem',
        height: '2rem',
        animation: 'spin 1s linear infinite',
        '@keyframes spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      }}
      role="status"
    >
      {/* TODO: Someone need to help replace this tailwind to sx props */}
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        {t('Loading...')}
      </span>
    </Box>
  );
};

export default Spinner;
