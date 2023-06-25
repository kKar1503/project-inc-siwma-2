import { useMemo } from 'react';
import { DateTime } from 'luxon';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { red } from '@mui/material/colors';
import { StarsRating } from '@inc/ui';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import MoreProfileIcon from './MoreProfileIcon';
import BuyBadge from './BuyBadge';
import SellBadge from './SellBadge';
import NegotiableBadge from './NegotiableBadge';

export type ProductListingItemProps = {
  productId: number;
  img: string | undefined;
  profileImg: string;
  type: string;
  name: string;
  rating: number | null;
  price: number;
  negotiable: boolean;
  ownerId: string;
  ownerFullName: string;
  createdAt: string;
  companyName: string;
  isUnitPrice: boolean;
  isOwnProfile: boolean;
};

export type ProductListingItemData = {
  data: ProductListingItemProps;
};

const ProductListingItem = ({ data }: ProductListingItemData) => {
  // destructure data
  const {
    productId,
    img,
    profileImg,
    type,
    name,
    rating,
    price,
    negotiable,
    ownerId,
    ownerFullName,
    createdAt,
    companyName,
    isUnitPrice,
    isOwnProfile,
  } = data;

  // save computation power to avoid multiple calculations on each render
  const datetime = useMemo(
    () => DateTime.fromISO(createdAt).toRelative({ locale: 'en-SG' }),
    [createdAt]
  );

  const theme = useTheme();

  return (
    <Card
      sx={{
        width: 288,
        ml: 'auto',
        mr: 'auto',
        height: '100%',
        border: `1px solid ${theme.palette.grey[400]}`,
        transition: 'transform .2s',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <Link style={{ textDecoration: 'none' }} href={`/profile/${ownerId}`}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} src={profileImg}>
              {ownerFullName?.charAt(0)}
            </Avatar>
          }
          title={ownerFullName}
          titleTypographyProps={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
          subheader={companyName}
        />
      </Link>
      <Link style={{ textDecoration: 'none' }} href={`/product/${productId}`}>
        <CardMedia
          component="img"
          height="288"
          image={
            img ||
            'https://www.bloomberglinea.com/resizer/cCYxWuUthcqd7ML4NfAFhu8x1Zg=/1440x0/filters:format(png):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/bloomberglinea/V22IOSYMMFDQDMMN2WK7U5Y6S4.png'
          }
        />
      </Link>
      <CardContent
        sx={({ spacing }) => ({
          pl: spacing(2),
        })}
      >
        <Link style={{ textDecoration: 'none' }} href={`/product/${productId}`}>
          <Box
            sx={({ spacing }) => ({
              display: 'flex',
              pb: spacing(2),
            })}
          >
            {type === 'Buy' && <BuyBadge />}
            {type === 'Sell' && <SellBadge />}
            {negotiable && <NegotiableBadge />}

            <Box sx={{ ml: 'auto' }}>
              {isOwnProfile && <MoreProfileIcon productId={productId} />}
            </Box>
          </Box>
          <Box
            sx={({ spacing }) => ({
              pb: spacing(2),
            })}
          >
            <Typography
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              variant="body2"
              color={theme.palette.text.primary}
              fontWeight={400}
              fontSize={20}
            >
              {name}
            </Typography>
          </Box>
          <Box
            sx={({ spacing }) => ({
              pb: spacing(2),
            })}
          >
            <Typography
              variant="subtitle2"
              color={theme.palette.text.primary}
              fontWeight="bold"
              fontSize={24}
            >
              {new Intl.NumberFormat('en-SG', {
                style: 'currency',
                currency: 'SGD',
              }).format(price)}
              {isUnitPrice && '/unit'}
            </Typography>
          </Box>
          <Box
            sx={({ spacing }) => ({
              pb: spacing(2),
            })}
          >
            <StarsRating rating={rating!} />
          </Box>
        </Link>
        <Box
          sx={({ spacing }) => ({
            pb: spacing(2),
          })}
        >
          <Typography variant="subtitle1" color={theme.palette.text.secondary} fontSize={16}>
            {datetime}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductListingItem;
