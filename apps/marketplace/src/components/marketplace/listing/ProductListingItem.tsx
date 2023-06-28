import { useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import S3Avatar from '@/components/S3Avatar';
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
import placeholder from 'public/images/listing-placeholder.svg';
import S3CardImage from '@/components/S3CardImage';
import { useTranslation } from 'react-i18next';
import translateRelativeTime from '@/utils/translationUtils';
import MoreProfileIcon from './MoreProfileIcon';
import ListingBadge from './ListingBadge';

export type ProductListingItemData = {
  data: Listing;
  showBookmark?: boolean;
  updateBookmarkData?: () => void;
  setDel?: React.Dispatch<React.SetStateAction<string>>;
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

const ProductListingItem = ({
  data,
  showBookmark,
  updateBookmarkData,
  setDel,
}: ProductListingItemData) => {
  const user = useSession();
  const { t } = useTranslation();
  const loggedUserUuid = user.data?.user.id as string;

  // save computation power to avoid multiple calculations on each render
  const datetime = useMemo(
    () => DateTime.fromISO(data.createdAt).toRelative({ locale: 'en-SG' }),
    [data.createdAt]
  );

  const listingName = data.name.replace(/\s+/g, '-').toLowerCase();

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
      <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/profile/${data.owner.id}`}>
        <CardHeader
          avatar={
            <S3Avatar
              sx={{
                bgcolor: red[500],
                height: isSm ? 28 : undefined,
                width: isSm ? 28 : undefined,
                fontSize: isSm ? 14 : undefined,
              }}
              src={data.owner.profilePic || placeholder}
            >
              {data.owner.name.charAt(0)}
            </S3Avatar>
          }
          sx={({ spacing }) => ({
            padding: isSm ? spacing(1) : undefined,
          })}
          title={data.owner.name}
          titleTypographyProps={{
            variant: isSm ? 'subtitle2' : 'subtitle1',
          }}
          subheader={data.owner.company.name}
          subheaderTypographyProps={{
            fontSize: isSm ? 10 : 14,
          }}
        />
      </Link>
      <Link style={{ textDecoration: 'none' }} href={`/listing/${listingName}-${data.id}`}>
        <S3CardImage
          src={data.coverImage || placeholder.src}
          alt="listing image"
          height={isSm ? 140 : 200}
          placeholder={placeholder.src}
        />
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
            mb: 1,
          }}
        >
          <Grid container alignItems={isSm ? 'flex-start' : 'center'} spacing={1}>
            {data.type === 'BUY' && (
              <Grid item>
                <ListingBadge type="buy" />
              </Grid>
            )}
            {data.type === 'SELL' && (
              <Grid item>
                <ListingBadge type="sell" />
              </Grid>
            )}
            {data.negotiable && (
              <Grid item>
                <ListingBadge type="negotiable" />
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
        <Link style={{ textDecoration: 'none' }} href={`/listing/${listingName}-${data.id}`}>
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
            <Typography variant={isSm ? 'h6' : 'h5'} color={theme.palette.text.primary}>
              {new Intl.NumberFormat('en-SG', {
                style: 'currency',
                currency: 'SGD',
              }).format(data.price)}
              {data.unitPrice && '/unit'}
            </Typography>
          </Box>
          <Box>
            <StarsRating rating={data.rating} />
          </Box>
        </Link>
        <Box
          sx={() => ({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <Typography variant="subtitle1" color={theme.palette.text.secondary}>
            {translateRelativeTime(datetime, t)}
          </Typography>
          {data.owner.id === loggedUserUuid && (
            <Box>
              <MoreProfileIcon setDel={setDel} productId={data.id} />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductListingItem;
