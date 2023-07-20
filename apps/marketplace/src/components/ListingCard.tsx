import Head from 'next/head';
import ProfileDetailCard from '@/components/marketplace/profile/ProfileDetailCard';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import fetchCompany from '@/middlewares/fetchCompany';
import { useRouter } from 'next/router';
import { useResponsiveness } from '@inc/ui';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';
import placeholder from 'public/images/listing-placeholder.svg';
import Grid from '@mui/material/Grid';


const ListingCard = () => (
  <Paper
    sx={({ spacing, shape }) => ({
      py: spacing(2),
      px: spacing(5),
      width: 1,
      ...shape,
    })}
  >
    <Box sx={{ alignItems: 'center', display: 'flex' }}>
      <Box sx={{ flexGrow: 1, alignItems: 'center', display: 'flex' }}>
        <Typography
          sx={({ typography, spacing }) => ({
            fontSize: typography.h4,
            fontWeight: 'bold',
            mr: spacing(2),
          })}
        >
          Steel Bar Metal
        </Typography>
        <Box
          sx={({ palette, spacing }) => ({
            backgroundColor: '#34D399',
            borderRadius: 5,
            width: '80px',
            textAlign: 'center',
            p: spacing(1),
          })}
        >
          <Typography
            sx={({ typography, palette }) => ({
              fontSize: typography.h5,
              fontWeight: 'auto',
              color: palette.common.white,
            })}
          >
            Buy
          </Typography>
        </Box>
      </Box>

      <Box>
        <IconButton sx={{ color: '#FFB743' }}>
          <BookmarkIcon fontSize="large" />
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
      $999 kg / m
    </Typography>
    <Box display="flex" alignItems="center">
      <Avatar />
      <Typography
        sx={({ spacing, typography }) => ({
          ml: spacing(2),
          fontSize: typography.h5,
        })}
      >
        Hi Metal Pte Ltd
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
      sx={({ spacing }) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: spacing(5),
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
          100kg
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          sx={({ typography }) => ({
            fontSize: typography.h5,
            fontWeight: 'bold',
          })}
        >
          Condition
        </Typography>
        <Typography
          sx={({ typography }) => ({
            fontSize: typography.h6,
          })}
        >
          Good
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
      sx={({ spacing }) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: spacing(5),
      })}
    >
      {/* Map parameters here */}
      <Grid item>
        <Typography
          sx={({ typography, palette }) => ({
            fontSize: typography.h6,
            color: palette.grey[500],
          })}
        >
          Length
        </Typography>
        <Typography
          sx={({ typography }) => ({
            fontSize: typography.h6,
          })}
        >
          69
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          sx={({ typography, palette }) => ({
            fontSize: typography.h6,
            color: palette.grey[500],
          })}
        >
          Width
        </Typography>
        <Typography
          sx={({ typography }) => ({
            fontSize: typography.h6,
          })}
        >
          69
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          sx={({ typography, palette }) => ({
            fontSize: typography.h6,
            color: palette.grey[500],
          })}
        >
          Width
        </Typography>
        <Typography
          sx={({ typography }) => ({
            fontSize: typography.h6,
          })}
        >
          69
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          sx={({ typography, palette }) => ({
            fontSize: typography.h6,
            color: palette.grey[500],
          })}
        >
          Width
        </Typography>
        <Typography
          sx={({ typography }) => ({
            fontSize: typography.h6,
          })}
        >
          69
        </Typography>
      </Grid>
      <Box>
        <Typography
          sx={({ typography, palette }) => ({
            fontSize: typography.h6,
            color: palette.grey[500],
          })}
        >
          Width
        </Typography>
        <Typography
          sx={({ typography }) => ({
            fontSize: typography.h6,
          })}
        >
          69
        </Typography>
      </Box>
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
      <Image src={placeholder} alt="placeholder" />
    </Box>
    <Grid
      container
      sx={({ spacing }) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: spacing(5),
        mt: spacing(2),
      })}
    >
      <Grid item>
        <Typography
          sx={({ typography }) => ({
            fontSize: typography.h5,
            fontWeight: 'bold',
          })}
        >
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
          No
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
          Round Bars
        </Typography>
      </Grid>
    </Grid>
    <Box
      sx={({ spacing }) => ({
        my: spacing(2),
      })}
    >
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
        3 days ago
      </Typography>
    </Box>
  </Paper>
);

export default ListingCard;