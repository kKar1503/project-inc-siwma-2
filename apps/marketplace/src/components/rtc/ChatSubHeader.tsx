import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import MakeOfferModal from '../modal/MakeOfferModal';

export type ChatSubHeaderProps = {
  itemPic: string;
  itemName: string;
  itemPrice: number;
  available: boolean;
  makeOffer: boolean;
  setMakeOffer: (val: boolean) => void;
};

const ChatSubHeader = ({
  itemPic,
  itemName,
  itemPrice,
  available,
  makeOffer,
  setMakeOffer,
}: ChatSubHeaderProps) => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, shape, shadows, palette, typography } = useTheme();
  const { t } = useTranslation();

  const chatSubHeaderStyles = useMemo(() => {
    if (isSm) {
      return {
        productName: {
          fontSize: typography.subtitle2,
          fontWeight: '500',
          marginLeft: spacing(2),
        },
        priceTag: {
          fontSize: typography.subtitle2,
          fontWeight: '600',
          marginLeft: spacing(2),
        },
        makeOfferBtn: {
          fontSize: '0.6rem',
          bgcolor: palette.primary.main,
          color: palette.common.white,
          px: spacing(1),
          marginRight: spacing(1),
          my: spacing(1),
          height: 'fit-content',
          width: '120px',
        },
        avatar: {
          width: 60,
          height: 60,
        },
      };
    }
    if (isMd) {
      return {
        productName: {
          fontSize: typography.h6,
          fontWeight: '500',
          marginLeft: spacing(3),
        },
        priceTag: {
          fontSize: typography.h6,
          fontWeight: '600',
          marginLeft: spacing(3),
        },
        makeOfferBtn: {
          fontSize: typography.subtitle2,
          bgcolor: palette.primary.main,
          color: palette.common.white,
          px: spacing(2),
          marginRight: spacing(4),
          my: spacing(1),
          height: '100%',
          width: '170px',
          '&:hover': {
            bgcolor: palette.primary[500],
          },
        },
        avatar: {
          width: 70,
          height: 70,
        },
      };
    }
    if (isLg) {
      return {
        productName: {
          fontSize: typography.h6,
          fontWeight: '500',
          marginLeft: spacing(3),
        },
        priceTag: {
          fontSize: typography.h6,
          fontWeight: '600',
          marginLeft: spacing(3),
        },
        makeOfferBtn: {
          fontSize: typography.subtitle2,
          bgcolor: palette.primary.main,
          color: palette.common.white,
          px: spacing(2),
          marginRight: spacing(4),
          my: spacing(1),
          height: '100%',
          width: '170px',
          '&:hover': {
            bgcolor: palette.primary[500],
          },
        },
        avatar: {
          width: 70,
          height: 70,
        },
      };
    }
    return {};
  }, [isSm, isMd, isLg]);

  const [openOffer, setOpenOffer] = useState(false);
  const [inputValue, setInputValue] = useState<number>(0);
  const handleMakeOffer = () => {
    setMakeOffer(true);
    setOpenOffer(true);
  };

  return (
    <Box
      sx={({ spacing, palette }) => ({
        border: 1,
        padding: spacing(2),
        borderColor: palette.grey[200],
        display: 'flex',
        pr: spacing(1),
      })}
    >
      <IconButton
        sx={({ spacing }) => ({
          p: spacing(0),
        })}
      >
        <Box
          sx={({ shadows }) => ({
            position: 'relative',
            display: 'inline-block',
            boxShadow: shadows[2],
          })}
        >
          <Avatar
            alt="company profile picture"
            src={itemPic}
            variant="square"
            sx={{
              borderRadius: 2,
              ...chatSubHeaderStyles?.avatar,
            }}
          />
          <Typography
            variant="subtitle1"
            sx={({ spacing }) => ({
              position: 'absolute',
              bottom: spacing(0),
              width: '100%',
              textAlign: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              padding: '2px',
              borderRadius: 2,
              fontSize: '0.8rem',
            })}
          >
            {available ? t('Available') : t('Sold')}
          </Typography>
        </Box>
      </IconButton>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={chatSubHeaderStyles?.productName}>{itemName}</Typography>
        <Typography sx={chatSubHeaderStyles?.priceTag}>${itemPrice.toFixed(2)}</Typography>
      </Box>

      <Button onClick={handleMakeOffer} sx={chatSubHeaderStyles?.makeOfferBtn}>
        {t('Make Offer')}
      </Button>
      <MakeOfferModal
        open={openOffer}
        setOpen={setOpenOffer}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </Box>
  );
};

export default ChatSubHeader;
