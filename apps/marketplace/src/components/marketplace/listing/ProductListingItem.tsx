import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DateTime } from 'luxon';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

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
}: {
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
}) => {
  return (
    <Card sx={{ maxWidth: 288, maxHeight: 588 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            T
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
        <div style={{ paddingBottom: 16, paddingTop: 16 }}>
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
};

export default ProductListingItem;
