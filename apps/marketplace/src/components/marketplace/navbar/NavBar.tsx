import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MessageIcon from '@mui/icons-material/Message';
import Link from '@mui/material/Link';
import Image from 'next/image';
import i18next from 'i18next';
import Grid from '@mui/material/Grid';
import SearchBar from '@inc/ui/lib/components/SearchBar';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import Switch from '@mui/material/Switch';
import AddListing from './AddListing';
import Profile from './Profile';
import MobileDrawer from './MobileDrawer';

const NavBar = () => {
  const user = useSession();
  const { t } = useTranslation();
  const userName = user.data?.user.name;
  const userId = user.data?.user.id;

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, palette, typography, zIndex } = useTheme();

  const [language, setLanguage] = useState<'English' | 'Chinese'>('English');

  const initializeLanguage = () => {
    const storedLanguage = localStorage.getItem('i18nextLng');

    if (storedLanguage) {
      i18next.changeLanguage(storedLanguage);
      setLanguage(storedLanguage === 'en' ? 'English' : 'Chinese');
    }
  };

  useEffect(() => {
    initializeLanguage();
  }, []);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = language === 'English' ? 'Chinese' : 'English';

    // Update the selected language in local storage
    localStorage.setItem('i18nextLng', newLanguage === 'English' ? 'en' : 'zh');

    // Change the language using i18next
    i18next.changeLanguage(newLanguage === 'English' ? 'en' : 'zh');

    // Update the state with the new language
    setLanguage(newLanguage);
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
              {t('Home')}
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
              {t('All Categories')}
            </Typography>
          </Link>
        )}
        <SearchBar />

        {!isSm && <AddListing />}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Grid component="label" container alignItems="center">
            <Grid sx={navBarStyles?.switchTxt} item>
              {t('EN')}
            </Grid>
            <Grid item>
              <Switch
                checked={language === 'Chinese'}
                onChange={handleLanguageChange}
                value="checked"
              />
            </Grid>
            <Grid sx={navBarStyles?.switchTxt} item>
              {t('CN')}
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
