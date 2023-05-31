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
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { Listing } from '@/utils/api/client/zod';
import { useSession } from 'next-auth/react';
import MoreProfileIcon from './MoreProfileIcon';
import BuyBadge from './BuyBadge';
import SellBadge from './SellBadge';
import NegotiableBadge from './NegotiableBadge';

const profileImg =
  'data:image/jpeg;base64,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';
const img =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEBUQEBIVEBUVDxAVEBUVFRAQFRAVFRUWFhURFhYYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLi0BCgoKDg0OFw8PFSsdFRkvKy0tNysrKzc3KysrKysrKy03LSstKy0tLS0rKysrKystLSstKysrKystKysrKysrK//AABEIANAA8wMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAECAwUGBwj/xABIEAABAwEEBwUEBgcECwAAAAABAAIDEQQSITEFBkFRYXGBIjKRobETQlJyFDNiksHRByMkc7PC8IKy4fEVF0NTY2R0g6Kj4v/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABcRAQEBAQAAAAAAAAAAAAAAAAARARL/2gAMAwEAAhEDEQA/APcUREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARRrTb4ovrJGM+ZzWnwK1Vp1usjMnukO5jXHzNB5oN8qLjZ9fWg9iBzh9p4YfAByx/6wP8Al/8A2/8AwrErtkXFjX9u2zu++PyWx0JrW21SiNsLxW9V9Q5raAntEZbuqkV0aKiILkREBERAREQEREBERAREQEREBFgltsbe89o4VFfBRJNNxDK87kKetEg2SLRTawH3Y+pP4D81Cl03MfeDflA/Gqs1K6pYZbUxvee0cyK+C5CS2Pd3nudzJp4LC6RXlK6qXTcIyJdyB/Gihzaw/CzxP4D81y0tvYMS4dO1TmRktfaNPMblj1H4VHmEmF109q1gmORDOTR/NVaK3aSlfW9I8jdeNPDJczbda27HA/Lj40r6haafWJ7u63qTiPx81R00sn+ezxUOa1Nb3nAf14ea5x1rlfi5x6Yeefmr4o9pzUG3db2nugu8gqtmedzeWJ8VFhAUpjgg7/UDQ8EsDpZY2yvEzmgv7YADWEdk4Zk40XbABrdjWgcAAPwXlOiNaJbLAYYWNBMjnl7qupVrRQNFB7uZJzyWvt2k5rQazSuk4E0aOTB2R4KRXqcmslkaSDaI6jOhvDxGCLyQKiQr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';
// export type ProductListingItemProps = {
//   productId: number;
//   img: string;
//   profileImg: string;
//   type: string;
//   name: string;
//   rating: number;
//   price: number;
//   negotiable: boolean;
//   ownerId: string;
//   ownerFullName: string;
//   createdAt: string;
//   companyName: string;
//   isUnitPrice: boolean;
//   isOwnProfile: boolean;
// };
export type ProductListingItemData = {
  data: Listing;
};

const ProductListingItem = ({ data }: ProductListingItemData) => {
  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  console.log(data)
  // destructure data
  // const {
  //   productId,
  //   img,
  //   profileImg,
  //   type,
  //   name,
  //   rating,
  //   price,
  //   negotiable,
  //   ownerId,
  //   ownerFullName,
  //   createdAt,
  //   companyName,
  //   isUnitPrice,
  //   isOwnProfile,
  // } = data;

  // save computation power to avoid multiple calculations on each render
  const datetime = useMemo(
    () => DateTime.fromISO(data.createdAt).toRelative({ locale: 'en-SG' }),
    [data.createdAt]
  );

  const theme = useTheme();
  const [isSm] = useResponsiveness(['sm']);

  return (
    <Card
      sx={{
        maxWidth: 500,
        maxHeight: '100%',
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
            <Avatar sx={{ bgcolor: red[500] }} src={profileImg}>
              {data.owner.name.charAt(0)}
            </Avatar>
          }
          title={data.owner.name}
          titleTypographyProps={{
            fontSize: isSm ? 14 : 16,
            fontWeight: 'bold',
          }}
          subheader={data.owner.company.name}
          subheaderTypographyProps={{
            fontSize: isSm ? 12 : 14,
          }}
        />
      </Link>
      <Link style={{ textDecoration: 'none' }} href={`/product/${data.id}`}>
        {/* <CardMedia component="img" height="200" image={img} /> */}
        {/* missing images */}
        <CardMedia component="img" height="200" image={img} />
      </Link>
      <CardContent
        sx={({ spacing }) => ({
          pl: isSm ? spacing(1) : spacing(2),
        })}
      >
        <Link style={{ textDecoration: 'none' }} href={`/product/${data.id}`}>
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

            {data.owner.id === loggedUserUuid && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MoreProfileIcon productId={data.id} />
              </Box>
            )}
          </Box>
          <Box
            sx={({ spacing }) => ({
              pb: spacing(1),
            })}
          >
            <Typography
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              variant="body2"
              color={theme.palette.text.primary}
              fontWeight={400}
              fontSize={isSm ? 18 : 20}
            >
              {data.name}
            </Typography>
          </Box>
          <Box
            sx={({ spacing }) => ({
              pb: spacing(1),
            })}
          >
            <Typography
              variant="subtitle2"
              color={theme.palette.text.primary}
              fontWeight="bold"
              fontSize={isSm ? 20 : 24}
            >
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
