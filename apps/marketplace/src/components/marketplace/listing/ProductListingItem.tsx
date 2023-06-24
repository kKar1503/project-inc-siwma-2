import { useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Link from 'next/link';
import { red } from '@mui/material/colors';
import { StarsRating, useResponsiveness } from '@inc/ui';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import bookmarkListing from '@/middlewares/bookmarks/bookmarkListing';
import { Listing } from '@/utils/api/client/zod';
import { useSession } from 'next-auth/react';
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
  data: Listing;
  showBookmark?: boolean;
  updateBookmarkData?: () => void;
};

const useBookmarkListing = (listingID: string, updateBookmarkData: (() => void) | undefined) => {
  const [isBookmarked, setIsBookmarked] = useState(true);

  const handleBookmarkListing = async () => {
    if (isBookmarked && updateBookmarkData) {
      await bookmarkListing(listingID);
      setIsBookmarked(false);
      updateBookmarkData();
    }
  };

  return {
    isBookmarked,
    handleBookmarkListing,
  };
};

const ProductListingItem = ({ data, showBookmark, updateBookmarkData }: ProductListingItemData) => {
  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  const placeholder = '/images/placeholder.png';

  // save computation power to avoid multiple calculations on each render
  const datetime = useMemo(
    () => DateTime.fromISO(data.createdAt).toRelative({ locale: 'en-SG' }),
    [data.createdAt]
  );

  const theme = useTheme();
  const [isSm] = useResponsiveness(['sm']);
  const { isBookmarked, handleBookmarkListing } = useBookmarkListing(data.id, updateBookmarkData);

  return (
    <Card
      sx={{
        maxWidth: 500,
        height: '100%',
        border: `1px solid ${theme.palette.grey[400]}`,
        transition: 'transform .2s',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <Link style={{ textDecoration: 'none' }} href={`/profile/${data.id}`}>
        <CardHeader
          style={{ marginLeft: '-10px' }}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} src={data.owner.profilePic || placeholder}>
              {data.owner.name.charAt(0)}
            </Avatar>
          }
          title={data.owner.name}
          titleTypographyProps={{
            variant: isSm ? 'subtitle2' : 'subtitle1',
          }}
          subheader={data.owner.company.name}
          subheaderTypographyProps={{
            fontSize: isSm ? 12 : 14,
          }}
        />
      </Link>
      <Link style={{ textDecoration: 'none' }} href={`/listing/${data.id}`}>
        <CardMedia component="img" height="200" image={data.owner.company.image || placeholder} />
      </Link>
      <CardContent
        sx={({ spacing }) => ({
          pl: isSm ? spacing(1) : spacing(2),
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 1,
          }}
        >
          <Grid container alignItems={isSm ? 'flex-start' : 'center'} spacing={1}>
            {data.type === 'BUY' && (
              <Grid item>
                <BuyBadge />
              </Grid>
            )}
            {data.type === 'SELL' && (
              <Grid item>
                <SellBadge />
              </Grid>
            )}
            {data.negotiable && (
              <Grid item>
                <NegotiableBadge />
              </Grid>
            )}
          </Grid>
          <Box>
            {showBookmark && (
              <IconButton
                aria-label="bookmark"
                onClick={handleBookmarkListing}
                sx={({ spacing }) => ({
                  p: spacing(0),
                })}
              >
                {isBookmarked ? (
                  <BookmarkIcon
                    fontSize="large"
                    sx={({ palette }) => ({
                      color: palette.warning[100],
                    })}
                  />
                ) : (
                  <BookmarkBorderIcon fontSize="large" />
                )}
              </IconButton>
            )}
          </Box>
        </Box>
        <Link style={{ textDecoration: 'none' }} href={`/listing/${data.id}`}>
          <Box
            sx={({ spacing }) => ({
              pb: spacing(1),
            })}
          >
            <Typography
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              variant="body1"
              color={theme.palette.text.primary}
            >
              {data.name}
            </Typography>
          </Box>
          <Box
            sx={({ spacing }) => ({
              pb: spacing(1),
            })}
          >
            <Typography variant="h5" color={theme.palette.text.primary}>
              {new Intl.NumberFormat('en-SG', {
                style: 'currency',
                currency: 'SGD',
              }).format(data.price)}
              {data.unitPrice && '/unit'}
            </Typography>
          </Box>
          <Box
            sx={({ spacing }) => ({
              pb: spacing(1),
            })}
          >
            <StarsRating rating={data.rating} />
          </Box>
        </Link>
        <Box
          sx={({ spacing }) => ({
            pb: spacing(1),
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <Typography variant="subtitle1" color={theme.palette.text.secondary}>
            {datetime}
          </Typography>
          {data.owner.id === loggedUserUuid && (
            <Box>
              <MoreProfileIcon productId={data.id} />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductListingItem;
