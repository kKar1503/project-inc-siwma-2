// ** React Imports
import { useEffect, useState, useMemo } from 'react';

// ** Next Imports
import { useSession } from 'next-auth/react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Grid from '@mui/material/Grid';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

// ** HooksImports
import { useQuery } from 'react-query';

// ** Image Imports
import placeholder from 'public/images/listing-placeholder.svg';

// ** Luxon Imports
import { DateTime } from 'luxon';

// ** Services
import fetchListing from '@/services/fetchListing';
import fetchCatById from '@/services/fetchCatById';
import fetchParamNames from '@/services/fetchParamNames';
import useUser from '@/services/users/useUser';
import useProduct from '@/services/useProduct';
import bookmarkListing from '@/services/bookmarks/bookmarkListing';

// ** i18n import
import { useTranslation } from 'react-i18next';

// ** Custom Components Imports
import { useResponsiveness } from '@inc/ui';
import S3BoxImage from './S3BoxImage';
import ListingBadge from './listing/ListingBadge';

export type ListingCardProps = {
  listingId: string;
};

const ListingCard = ({ listingId }: ListingCardProps) => {
  const useFetchListingQuery = (listingId: string) => {
    const { data } = useQuery(['user', listingId], async () => fetchListing(listingId), {
      enabled: listingId !== undefined,
    });

    return data;
  };

  const useFetchCategoryQuery = (categoryId: string) => {
    const { data } = useQuery(['category', categoryId], async () => fetchCatById(categoryId), {
      enabled: categoryId !== undefined,
    });

    return data;
  };

  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  const userDetails = useUser(loggedUserUuid).data;

  const useFetchParamNamesQuery = (paramIds?: string[]) => {
    const { data } = useQuery(['paramNames', paramIds], async () => fetchParamNames(paramIds), {
      enabled: paramIds !== undefined,
    });

    return data;
  };

  const useBookmarkListing = (listingId: string) => {
    const bookmarkBool = userDetails?.bookmarks?.listings.includes(listingId);

    const [isBookmarked, setIsBookmarked] = useState(bookmarkBool);

    // useEffect to update isBookmarked when bookmarkBool changes
    useEffect(() => {
      setIsBookmarked(bookmarkBool);
    }, [bookmarkBool]);

    const handleBookmarkListing = async () => {
      await bookmarkListing(listingId);
      setIsBookmarked(!isBookmarked);
    };

    return {
      isBookmarked,
      handleBookmarkListing,
    };
  };

  const listingDetails = useFetchListingQuery(listingId);

  const productDetails = useProduct(listingDetails?.productId || 'null').data;

  const categoryDetails = useFetchCategoryQuery(productDetails?.categoryId || 'null');

  const { isBookmarked, handleBookmarkListing } = useBookmarkListing(listingId);

  const listingParamNames: string[] = [];

  listingDetails?.parameters?.map((id) => {
    listingParamNames.push(id.paramId);
    return id.paramId;
  });

  const paramNames = useFetchParamNamesQuery(listingParamNames);

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const theme = useTheme();
  const { spacing, typography, palette } = theme;
  const { t } = useTranslation();

  const cardStyle = useMemo(() => {
    if (isSm || isMd) {
      return {
        title: {
          fontSize: typography.subtitle1,
          fontWeight: 'bold',
        },
        subtitle: {
          fontSize: typography.subtitle2,
        },
        name: {
          fontSize: typography.subtitle2,
        },
      };
    }
    if (isMd) {
      return {
        title: {
          fontSize: typography.h6,
          fontWeight: 'bold',
        },
        subtitle: {
          fontSize: typography.subtitle1,
        },
        name: {
          fontSize: typography.subtitle1,
        },
      };
    }
    if (isLg) {
      return {
        title: {
          fontSize: typography.h5,
          fontWeight: 'bold',
        },
        subtitle: {
          fontSize: typography.h5,
        },
        name: {
          fontSize: typography.h6,
        },
      };
    }
    return {
      title: {
        fontSize: typography.h5,
        fontWeight: 'bold',
      },
      subtitle: {
        fontSize: typography.h5,
      },
      name: {
        fontSize: typography.h6,
      },
    };
  }, [isSm, isMd, isLg]);

  return (
    <Paper
      sx={({ spacing, shape }) => ({
        py: spacing(2),
        px: spacing(5),
        mb: spacing(2),
        width: 1,
        ...shape,
      })}
    >
      <Box sx={{ alignItems: 'center', display: 'flex' }}>
        <Box sx={{ flexGrow: 1, alignItems: 'center', display: 'flex' }}>
          <Typography sx={cardStyle.title} mr={spacing(2)}>
            {listingDetails?.name}
          </Typography>
          {listingDetails?.type === 'BUY' && <ListingBadge type="buy" />}
          {listingDetails?.type === 'SELL' && <ListingBadge type="sell" />}
        </Box>

        <Box>
          <IconButton onClick={handleBookmarkListing} sx={{ color: '#FFB743' }}>
            {isBookmarked ? (
              <BookmarkIcon
                fontSize={isSm ? 'medium' : 'large'}
                sx={({ palette }) => ({
                  color: palette.warning[100],
                })}
              />
            ) : (
              <BookmarkBorderIcon
                sx={({ palette }) => ({
                  color: palette.common.black,
                })}
                fontSize={isSm ? 'medium' : 'large'}
              />
            )}
          </IconButton>
          <IconButton
            // onclick redirect to chat page, should create a new chat if none exists, else redirect to existing chat
            // ^ not implemented yet, just redirects to chat page
            href="/chat"
            sx={({ palette, spacing }) => ({
              color: palette.common.black,
            })}
          >
            <ChatIcon fontSize={isSm ? 'medium' : 'large'} />
          </IconButton>
        </Box>
      </Box>

      <Typography my={spacing(2)} sx={cardStyle.subtitle}>
        ${listingDetails?.price}/{productDetails?.unit}
      </Typography>
      <Box display="flex" alignItems="center">
        <Avatar />
        <Typography ml={spacing(2)} sx={cardStyle.subtitle}>
          {listingDetails?.owner.company.name}
        </Typography>
      </Box>
      <Divider
        sx={({ spacing }) => ({
          my: spacing(2),
          borderBottomWidth: 3,
        })}
      />

      <Grid
        container
        spacing={5}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={({ spacing }) => ({
          display: 'flex',
          flexDirection: 'row',
        })}
      >
        <Grid item>
          <Typography sx={cardStyle.title}>{t('Quantity')}</Typography>
          <Typography sx={cardStyle.name}>
            {listingDetails?.quantity}
            {productDetails?.unit}
          </Typography>
        </Grid>
      </Grid>
      <Typography mt={spacing(2)} sx={cardStyle.title}>
        {t('Dimensions (mm)')}
      </Typography>
      <Grid
        container
        spacing={5}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={({ spacing }) => ({
          display: 'flex',
          flexDirection: 'row',
        })}
      >
        {listingDetails?.parameters?.map((id) => (
          <Grid item>
            <Typography color={palette.grey[500]} sx={cardStyle.name}>
              {paramNames?.find((param: { id: string }) => param.id === id.paramId)?.name}
            </Typography>
            <Typography sx={cardStyle.name}>{id.value}</Typography>
          </Grid>
        ))}
      </Grid>
      <Typography my={spacing(2)} sx={cardStyle.title}>
        {t('Cross Section')}
      </Typography>
      <Box>
        {/* throws error without the empty string */}
        <S3BoxImage
          src={categoryDetails?.crossSectionImage || ''}
          sx={{ objectFit: 'cover', width: '250px' }}
        />
      </Box>
      <Grid
        container
        spacing={5}
        rowSpacing={1}
        columnSpacing={{ xs: 3, sm: 4, md: 5 }}
        sx={({ spacing }) => ({
          display: 'flex',
          flexDirection: 'row',
          my: spacing(2),
        })}
      >
        <Grid item>
          <Typography sx={cardStyle.title}>
            {/* no metal grade column? */}
            {t('Metal Grade')}
          </Typography>
          <Typography sx={cardStyle.name}>S233</Typography>
        </Grid>
        <Grid item>
          <Typography sx={cardStyle.title}>
            {/* no certification column? */}
            {t('Certification')}
          </Typography>
          <Typography sx={cardStyle.name}>Example Cert</Typography>
        </Grid>
        <Grid item>
          <Typography sx={cardStyle.title}>{t('Negotiable')}</Typography>
          <Typography sx={cardStyle.name}>{listingDetails?.negotiable ? 'Yes' : 'No'}</Typography>
        </Grid>
        <Grid item>
          <Typography sx={cardStyle.title}>{t('Category')}</Typography>
          <Typography sx={cardStyle.name}>{categoryDetails?.name}</Typography>
        </Grid>
        <Grid item>
          <Typography sx={cardStyle.title}>{t('Posted on')}</Typography>
          <Typography sx={cardStyle.name}>
            {listingDetails &&
              DateTime.fromISO(listingDetails.createdAt).toRelative({ locale: 'en-SG' })}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ListingCard;
