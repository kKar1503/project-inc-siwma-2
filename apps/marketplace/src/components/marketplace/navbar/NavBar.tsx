import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MessageIcon from '@mui/icons-material/Message';
import Link from '@mui/material/Link';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import SearchBar from '@inc/ui/lib/components/SearchBar';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import AddListing from './AddListing';
import Profile from './Profile';
import MobileDrawer from './MobileDrawer';
import ChangeLanguageButton from './ChangeLanguageButton';

const NavBar = () => {
  const user = useSession();
  const router = useRouter();
  const { t } = useTranslation();
  const userName = user.data?.user.name;
  const userId = user.data?.user.id;

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, palette, typography, zIndex } = useTheme();

  const handleSearch = (search: string) => {
    if (search.trim() !== '') {
      router.push(`/searchResult?search=${search}`);
    }
  };

  const handleUrl = (url: string) => {
    if (router.pathname !== url) {
      router.push(url);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'white',
        boxShadow: 1,
        position: 'sticky',
        top: 0,
        zIndex: zIndex.appBar,
      }}
    >
      <Toolbar>
        {/* <Box sx={{ ml: isLg ? spacing(0) : spacing(2) }}> */}
        <Image src="/images/favicons/SIWMA-icon.png" alt="logo" width={60} height={40} />
        {/* </Box> */}

        {!isSm && (
          <Box onClick={() => handleUrl('/')}>
            <Typography
              noWrap
              sx={{
                color: palette.primary.main,
                fontSize: typography.subtitle2,
                ml: isLg ? spacing(3) : spacing(2),
                cursor: 'pointer',
              }}
            >
              {t('Home')}
            </Typography>
          </Box>
        )}
        {!isSm && (
          <Link href="/categories" underline="none">
            <Typography
              noWrap
              sx={{
                fontSize: typography.subtitle2,
                ml: isLg ? spacing(3) : spacing(2),
                mr: isLg ? spacing(3) : spacing(2),
              }}
            >
              {t('All Categories')}
            </Typography>
          </Link>
        )}
        <SearchBar handleSearch={handleSearch} />

        {!isSm && <AddListing />}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Grid component="label" container alignItems="center">
            <ChangeLanguageButton />
          </Grid>

          <Box onClick={() => handleUrl('/chat')}>
            <IconButton
              size="medium"
              sx={({ spacing }) => ({
                ml: isMd ? spacing(1) : spacing(2),
                // TODO: Not sure why this is being pushed down, fix it later
                mt: '5px',
              })}
            >
              <Badge>
                <MessageIcon
                  sx={{
                    fontSize: typography.h5,
                    color: palette.text.secondary,
                  }}
                />
              </Badge>
            </IconButton>
          </Box>

          <Profile userName={userName} userId={userId} />
        </Box>

        {/* mobile drawer icon here */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <MobileDrawer userId={userId} />
        </Box>
        {/* end of mobile drawer icon */}
      </Toolbar>
    </Box>
  );
};

export default NavBar;
