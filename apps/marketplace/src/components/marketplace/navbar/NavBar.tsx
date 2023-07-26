import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MessageIcon from '@mui/icons-material/Message';
import Link from '@mui/material/Link';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import { useResponsiveness } from '@inc/ui';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '@inc/ui';
import CreateListing from './CreateListing';

import Profile from './Profile';
import MobileDrawer from './MobileDrawer';
import ChangeLanguageButton from './ChangeLanguageButton';

interface NavBarProps {
  renderSearchBar?: boolean;
}

const NavBar = ({ renderSearchBar = true }: NavBarProps) => {
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
        borderBottom: 1,
        borderColor: (theme) => theme.palette.divider,
        position: 'sticky',
        top: 0,
        // height: 114,
        zIndex: zIndex.appBar,
      }}
    >
      <Box
        id="top-navbar-fulllength"
        sx={{
          // make a border with custom translucent color
          borderBottom: 1,
          borderColor: '#dbdbdb',
        }}
      >
        <Box
          id="top-navbar-scaled"
          sx={{
            minWidth: isSm ? '0px' : '900px',
            px: isSm ? '0px' : 'calc(50vw - 656px)',
          }}
        >
          <Toolbar
            id="tool-bar-1"
            sx={{
              height: 64,
            }}
          >
            {isLg && (
              <Image
                src="/images/favicons/SIWMA-icon.png"
                alt="logo"
                width={60}
                height={40}
                style={{ marginRight: spacing(2) }}
              />
            )}

            {/* mobile drawer icon here */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <MobileDrawer userId={userId} />
            </Box>
            {/* end of mobile drawer icon */}

            {!isSm && (
              <Box onClick={() => handleUrl('/')}>
                <Typography
                  noWrap
                  sx={{
                    color: palette.primary.main,
                    fontSize: typography.subtitle2,
                    display: 'flex',
                    justifyContent: 'center',
                    mx: isLg ? spacing(1) : spacing(0),
                    width: isMd ? '50px' : '60px',
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
                    display: 'flex',
                    justifyContent: 'center',
                    width: isMd ? '90px' : '100px',
                    fontSize: typography.subtitle2,
                    mx: isLg ? spacing(1) : spacing(2),
                  }}
                >
                  {t('All Categories')}
                </Typography>
              </Link>
            )}
            {isSm && <SearchBar handleSearch={handleSearch} />}

            <Box sx={{ flexGrow: 1 }} />
            {!isSm && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
                <Grid component="label" container alignItems="center">
                  <ChangeLanguageButton />
                </Grid>

                <Box onClick={() => handleUrl('/chat')}>
                  <IconButton
                    size="medium"
                    sx={({ spacing }) => ({
                      mx: isMd ? spacing(1) : spacing(2),
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

                <Box sx={{ mr: spacing(2) }}>
                  <Profile userName={userName} userId={userId} />
                </Box>

                {!isSm && <CreateListing />}
              </Box>
            )}
          </Toolbar>
        </Box>
      </Box>

      {renderSearchBar && !isSm && (
        <Box
          id="bottom-navbar-scaled"
          sx={{
            minWidth: isSm ? '0px' : '900px',
            px: isSm ? '0px' : 'calc(50vw - 656px)',
          }}
        >
          <Toolbar variant="dense" sx={{ minHeight: 20, height: 48 }}>
            <Box sx={{ width: '100%' }}>
              <SearchBar handleSearch={handleSearch} />
            </Box>
          </Toolbar>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
