// ** React Imports

// ** Next Imports

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

// ** HooksImports
import { useQuery } from 'react-query';

// ** Image Imports
import placeholder from 'public/images/listing-placeholder.svg';

// ** Luxon Imports
import { DateTime } from 'luxon';

// ** Middlewares
import fetchListing from '@/middlewares/fetchListing';
import fetchCatById from '@/middlewares/fetchCatById';
import fetchParamNames from '@/middlewares/fetchParamNames';

// ** Custom Components Imports
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

  const useFetchParamNamesQuery = (paramIds?: string[]) => {
    const { data } = useQuery(['paramNames', paramIds], async () => fetchParamNames(paramIds), {
      enabled: paramIds !== undefined,
    });

    return data;
  };

  const listingDetails = useFetchListingQuery(listingId);

  const categoryDetails = useFetchCategoryQuery(listingDetails?.categoryId || 'null');

  const listingParamNames: string[] = [];

  listingDetails?.parameters?.map((id) => {
    listingParamNames.push(id.paramId);
    return id.paramId;
  });

  const paramNames = useFetchParamNamesQuery(listingParamNames);

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
          <Typography
            sx={({ typography, spacing }) => ({
              fontSize: typography.h5,
              fontWeight: 'bold',
              mr: spacing(2),
            })}
          >
            {listingDetails?.name}
          </Typography>
          {listingDetails?.type === 'BUY' && <ListingBadge type="buy" />}
          {listingDetails?.type === 'SELL' && <ListingBadge type="sell" />}
        </Box>

        <Box>
          <IconButton sx={{ color: '#FFB743' }}>
            <BookmarkIcon
              fontSize="large"
              sx={({ palette }) => ({
                color: palette.warning[100],
              })}
            />
          </IconButton>
          <IconButton
            sx={({ palette, spacing }) => ({
              color: palette.common.black,
            })}
          >
            <ChatIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <Typography
        sx={({ typography, spacing }) => ({
          fontSize: typography.h5,
          my: spacing(2),
        })}
      >
        ${listingDetails?.price}/{listingDetails?.unit}
      </Typography>
      <Box display="flex" alignItems="center">
        <Avatar />
        <Typography
          sx={({ spacing, typography }) => ({
            ml: spacing(2),
            fontSize: typography.h5,
          })}
        >
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
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h5,
              fontWeight: 'bold',
            })}
          >
            Quantity
          </Typography>
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h6,
            })}
          >
            {listingDetails?.quantity}
            {listingDetails?.unit}
          </Typography>
        </Grid>
      </Grid>
      <Typography
        sx={({ spacing, typography }) => ({
          fontSize: typography.h5,
          fontWeight: 'bold',
          mt: spacing(2),
        })}
      >
        Dimensions (mm)
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
            <Typography
              sx={({ typography, palette }) => ({
                fontSize: typography.h6,
                color: palette.grey[500],
              })}
            >
              {paramNames?.find((param) => param.id === id.paramId)?.name}
            </Typography>
            <Typography
              sx={({ typography }) => ({
                fontSize: typography.h6,
              })}
            >
              {id.value}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Typography
        sx={({ spacing, typography }) => ({
          fontSize: typography.h5,
          fontWeight: 'bold',
          my: spacing(2),
        })}
      >
        Cross Section
      </Typography>
      <Box>
        {/* throws error without the empty string */}
        <S3BoxImage src={categoryDetails?.crossSectionImage || ''} />
      </Box>
      <Grid
        container
        spacing={5}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={({ spacing }) => ({
          display: 'flex',
          flexDirection: 'row',
          my: spacing(2),
        })}
      >
        <Grid item>
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h5,
              fontWeight: 'bold',
            })}
          >
            {/* no metal grade column? */}
            Metal Grade
          </Typography>
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h6,
            })}
          >
            S233
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h5,
              fontWeight: 'bold',
            })}
          >
            {/* no certification column? */}
            Certification
          </Typography>
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h6,
            })}
          >
            Example Cert
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h5,
              fontWeight: 'bold',
            })}
          >
            Negotiable
          </Typography>
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h6,
            })}
          >
            {listingDetails?.negotiable ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h5,
              fontWeight: 'bold',
            })}
          >
            Category
          </Typography>
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h6,
            })}
          >
            {categoryDetails?.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h5,
              fontWeight: 'bold',
            })}
          >
            Posted on
          </Typography>
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h6,
            })}
          >
            {listingDetails &&
              DateTime.fromISO(listingDetails.createdAt).toRelative({ locale: 'en-SG' })}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ListingCard;
