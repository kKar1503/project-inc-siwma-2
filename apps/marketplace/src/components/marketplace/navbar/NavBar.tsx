import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MessageIcon from '@mui/icons-material/Message';
import Link from '@mui/material/Link';
import Image from 'next/image';
import SearchBar from '@inc/ui/lib/components/SearchBar';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { useRouter } from 'next/router';
import AddListing from './AddListing';
import Profile from './Profile';
import MobileDrawer from './MobileDrawer';

const NavBar = () => {
  const user = useSession();

  const router = useRouter();

  const userName = user.data?.user.name;
  const userId = user.data?.user.id;

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, palette, typography, zIndex } = useTheme();

  const [language, setLanguage] = useState<'English' | 'Chinese'>('English');

  const handleSearch = (search: string) => {
    if (search.trim() !== '') {
      router.push(`/searchresult?search=${search}`);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // handle i18 change here
    setLanguage(language === 'English' ? 'Chinese' : 'English');
  };

  const navBarStyles = useMemo(() => {
    if (isSm) {
      return {
        switchTxt: {
          fontSize: typography.subtitle2,
        },
      };
    }

    if (isMd) {
      return {
        switchTxt: {
          fontSize: '10px',
          fontWeight: 500,
        },
      };
    }

    if (isLg) {
      return {
        switchTxt: {
          fontSize: typography.subtitle2,
        },
      };
    }

    return {
      switchTxt: {
        fontSize: '24px',
      },
    };
  }, [isSm, isMd, isLg]);

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
          <Link href="/" underline="none">
            <Typography
              noWrap
              sx={{
                fontSize: typography.subtitle2,
                ml: isLg ? spacing(3) : spacing(2),
              }}
            >
              Home
            </Typography>
          </Link>
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
              All Categories
            </Typography>
          </Link>
        )}
        <SearchBar handleSearch={handleSearch} />

        {!isSm && <AddListing />}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Grid component="label" container alignItems="center">
            <Grid sx={navBarStyles?.switchTxt} item>
              EN
            </Grid>
            <Grid item>
              <Switch
                checked={language === 'Chinese'}
                onChange={handleLanguageChange}
                value="checked"
              />
            </Grid>
            <Grid sx={navBarStyles?.switchTxt} item>
              CN
            </Grid>
          </Grid>

          <Link href="/chat" underline="none">
            <IconButton
              size="medium"
              sx={({ spacing }) => ({
                ml: isMd ? spacing(1) : spacing(2),
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
          </Link>

          <Profile userName={userName} userId={userId} />
        </Box>

        {/* mobile drawer icon here */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <MobileDrawer userId={userId} language={language} />
        </Box>
        {/* end of mobile drawer icon */}
      </Toolbar>
    </Box>
  );
};

export default NavBar;
