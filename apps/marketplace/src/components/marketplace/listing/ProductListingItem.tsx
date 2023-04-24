import * as React from 'react';
import { DateTime } from 'luxon';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Rating, Card } from '@mui/material';
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
}: ProductListingItemProps) => (
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
      <div style={{ paddingBottom: 16 }}>
        {type === 'Buy' && <BuyBadge />}
        {type === 'Sell' && <SellBadge />}
        {negotiable && <NegotiableBadge />}
      </div>
      <div style={{ paddingBottom: 16 }}>
        <Typography variant="body2" color="text.primary" fontWeight={400} fontSize={20}>
          {name}
        </Typography>
      </div>
      <div style={{ paddingBottom: 16 }}>
        <Typography variant="h4" color="text.primary" fontWeight="bold" fontSize={24}>
          {new Intl.NumberFormat('en-SG', {
            style: 'currency',
            currency: 'SGD',
          }).format(price)}
          {isUnitPrice && <span className="text-sm font-normal">/unit</span>}
        </Typography>
      </div>
      <div style={{ paddingBottom: 16 }}>
        <Rating
          defaultValue={rating}
          readOnly
          size="medium"
          precision={0.5}
          style={{ color: '#00C853' }}
          emptyIcon={<StarIcon fontSize="inherit" />}
        />
      </div>
      <div style={{ paddingBottom: 16 }}>
        <Typography variant="subtitle1" color="text.secondary" fontSize={16}>
          {DateTime.fromISO(createdAt).toRelative({ locale: 'en-SG' })}
        </Typography>
      </div>
    </CardContent>
  </Card>
);

export default ProductListingItem;
