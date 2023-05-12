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
import MoreProfileIcon from './MoreProfileIcon';
import BuyBadge from './BuyBadge';
import SellBadge from './SellBadge';
import NegotiableBadge from './NegotiableBadge';

export type ProductListingItemProps = {
  productId: number;
  img: string;
  profileImg: string;
  type: string;
  name: string;
  rating: number;
  price: number;
  negotiable: boolean;
  ownerId: string;
  ownerFullName: string;
  createdAt: string;
  companyName: string;
  isUnitPrice: boolean;
  isOwnProfile: boolean;
};

const ProductListingItem = ({
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
}: ProductListingItemProps) => {
  // save computation power to avoid multiple calculations on each render
  const datetime = useMemo(
    () => DateTime.fromISO(createdAt).toRelative({ locale: 'en-SG' }),
    [createdAt]
  );

  return (
    <Card sx={{ maxWidth: 288, maxHeight: 600, border: '1px solid #C4C4C4' }}>
      <Link style={{ textDecoration: 'none' }} href={`/profile/${ownerId}`}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} src={profileImg}>
              {ownerFullName.charAt(0)}
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
        <CardMedia component="img" height="288" image={img} />
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
              color="text.primary"
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
            <Typography variant="h4" color="text.primary" fontWeight="bold" fontSize={24}>
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
            <StarsRating rating={rating} />
          </Box>
        </Link>
        <Box
          sx={({ spacing }) => ({
            pb: spacing(2),
          })}
        >
          <Typography variant="subtitle1" color="text.secondary" fontSize={16}>
            {datetime}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductListingItem;
