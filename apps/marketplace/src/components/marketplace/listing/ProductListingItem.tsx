import { useMemo } from 'react';
import { DateTime } from 'luxon';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import BuyBadge from './BuyBadge';
import SellBadge from './SellBadge';
import NegotiableBadge from './NegotiableBadge';

export type ProductListingItemProps = {
  img: string;
  type: string;
  name: string;
  rating: number;
  href: string;
  price: number;
  negotiable: boolean;
  ownerId: string;
  ownerFullName: string;
  createdAt: string;
  companyName: string;
  unit_price: boolean;
};

const ProductListingItem = ({
  img,
  type,
  name,
  rating,
  href,
  price,
  negotiable,
  ownerId,
  ownerFullName,
  createdAt,
  companyName,
  unit_price: isUnitPrice,
}: ProductListingItemProps) => {
  // save computation power to avoid multiple calculations on each render
  const datetime = useMemo(
    () => DateTime.fromISO(createdAt).toRelative({ locale: 'en-SG' }),
    [createdAt]
  );
  return (
    <Card sx={{ maxWidth: 288, maxHeight: 600 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {ownerFullName[0]}
          </Avatar>
        }
        title={ownerFullName}
        titleTypographyProps={{
          fontSize: 16,
          fontWeight: 'bold',
        }}
        subheader={companyName}
      />
      <CardMedia component="img" height="288" image={img} alt="Paella dish" />
      <CardContent style={{ paddingLeft: 16 }}>
        {/* MUI default spacing is 8px */}
        <Box
          sx={{
            pb: 2,
          }}
        >
          {type === 'Buy' && <BuyBadge />}
          {type === 'Sell' && <SellBadge />}
          {negotiable && <NegotiableBadge />}
        </Box>
        <Box
          sx={{
            pb: 2,
          }}
        >
          <Typography variant="body2" color="text.primary" fontWeight={400} fontSize={20}>
            {name}
          </Typography>
        </Box>
        <Box
          sx={{
            pb: 2,
          }}
        >
          <Typography variant="h4" color="text.primary" fontWeight="bold" fontSize={24}>
            {new Intl.NumberFormat('en-SG', {
              style: 'currency',
              currency: 'SGD',
            }).format(price)}
            {isUnitPrice && <span className="text-sm font-normal">/unit</span>}
          </Typography>
        </Box>
        <Box
          sx={{
            pb: 2,
          }}
        >
          <Rating
            defaultValue={rating}
            readOnly
            size="medium"
            precision={0.5}
            style={{ color: '#00C853' }}
            emptyIcon={<StarIcon fontSize="inherit" />}
          />
        </Box>
        <Box
          sx={{
            pb: 2,
          }}
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
