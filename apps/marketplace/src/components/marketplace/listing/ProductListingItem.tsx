import * as React from 'react';
import { styled } from '@mui/material/styles';
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
  const [image, setImage] = React.useState(img);

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
      <CardContent>
        <div style={{ paddingBottom: 16 }}>
          <Typography variant="body2" color="text.secondary" fontWeight={400} fontSize={20}>
            {name}
          </Typography>
        </div>
        <div style={{ paddingBottom: 16 }}>
          <Typography variant="h4" color="text.primary" fontWeight="bold" fontSize={24}>
            ${price.toFixed(2)}
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductListingItem;
