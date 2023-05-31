import React, { useState, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import MessageIcon from '@mui/icons-material/Message';
import Link from '@mui/material/Link';
import Image from 'next/image';
import SearchBar from '@inc/ui/lib/components/SearchBar';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import AddListing from './AddListing';
import Profile from './Profile';

const NavBar = () => {
  const user = useSession();

  const userName = user.data?.user.name;
  const userId = user.data?.user.id;

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, shape, shadows, palette, typography } = useTheme();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMobileMenuOpen = mobileMoreAnchorEl !== null;

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'white',
        boxShadow: 1,
        position: 'sticky',
        top: 0,
        zIndex: 9999,
      }}
    >
      <Toolbar>
        <Image src="/images/favicons/SIWMA-icon.png" alt="logo" width={60} height={40} />

        {!isSm && (
          <Link href="/" underline="none">
            <Typography
              noWrap
              sx={({ spacing, typography }) => ({
                fontSize: typography.subtitle2,
                ml: spacing(3),
              })}
            >
              Home
            </Typography>
          </Link>
        )}
        {!isSm && (
          <Link href="/categories" underline="none">
            <Typography
              noWrap
              sx={({ spacing, typography }) => ({
                fontSize: typography.subtitle2,
                ml: spacing(3),
                mr: spacing(3),
              })}
            >
              All Categories
            </Typography>
          </Link>
        )}
        <SearchBar />

        {!isSm && <AddListing />}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="medium">
            <TranslateIcon
              sx={({ typography, palette }) => ({
                fontSize: typography.h5,
                color: palette.text.secondary,
              })}
            />
          </IconButton>

          <Link href="/chat" underline="none">
            <IconButton
              size="medium"
              sx={({ spacing }) => ({
                ml: spacing(2),
              })}
            >
              <Badge>
                <MessageIcon
                  sx={({ typography, palette }) => ({
                    fontSize: typography.h5,
                    color: palette.text.secondary,
                  })}
                />
              </Badge>
            </IconButton>
          </Link>

          <IconButton
            size="medium"
            sx={({ spacing }) => ({
              ml: spacing(2),
            })}
          >
            <Badge>
              <NotificationsIcon
                sx={({ typography, palette }) => ({
                  fontSize: typography.h5,
                  color: palette.text.secondary,
                })}
              />
            </Badge>
          </IconButton>

          <Profile userName={userName} userId={userId} />
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="medium"
            aria-label="show more"
            aria-controls="primary-search-account-menu-mobile"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
            sx={({ spacing }) => ({
              ml: spacing(2),
            })}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <IconButton
                sx={({ spacing }) => ({
                  ml: spacing(2),
                })}
              >
                <TranslateIcon
                  sx={({ typography, palette }) => ({
                    fontSize: typography.h5,
                    color: palette.text.secondary,
                  })}
                />
              </IconButton>
              <Typography
                sx={({ spacing, typography, palette }) => ({
                  fontSize: typography.caption,
                  color: palette.text.secondary,
                  ml: spacing(1),
                  mr: spacing(2),
                })}
              >
                Translate
              </Typography>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <IconButton
                sx={({ spacing }) => ({
                  ml: spacing(2),
                })}
              >
                <MessageIcon
                  sx={({ typography, palette }) => ({
                    fontSize: typography.h5,
                    color: palette.text.secondary,
                  })}
                />
              </IconButton>
              <Typography
                sx={({ spacing, typography, palette }) => ({
                  fontSize: typography.caption,
                  color: palette.text.secondary,
                  ml: spacing(1),
                  mr: spacing(2),
                })}
              >
                Message
              </Typography>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <IconButton
                sx={({ spacing }) => ({
                  ml: spacing(2),
                })}
              >
                <NotificationsIcon
                  sx={({ typography, palette }) => ({
                    fontSize: typography.h5,
                    color: palette.text.secondary,
                  })}
                />
              </IconButton>

              <Typography
                sx={({ spacing, typography, palette }) => ({
                  fontSize: typography.caption,
                  color: palette.text.secondary,
                  ml: spacing(1),
                  mr: spacing(2),
                })}
              >
                Notification
              </Typography>
            </MenuItem>

            <MenuItem>
              <Profile userName={userName} userId={userId} />
              <Typography
                sx={({ spacing, typography, palette }) => ({
                  fontSize: typography.caption,
                  color: palette.text.secondary,
                  ml: spacing(1),
                  mr: spacing(2),
                })}
              >
                Profile
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default NavBar;
