import React, { useState, MouseEvent } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Link from '@mui/material/Link';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { useResponsiveness } from '@inc/ui';
import { useTheme } from '@mui/material/styles';

export type UserNameProps = {
  userName: string | undefined;
  userId: string | undefined;
};

const Profile = ({ userName, userId }: UserNameProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { t } = useTranslation();
  const { typography, palette, spacing } = useTheme();

  const isMenuOpen = anchorEl !== null;

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    setAnchorEl(null);
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <IconButton
        size="medium"
        onClick={handleProfileMenuOpen}
        sx={({ spacing }) => ({
          mx: isMd ? spacing(1) : spacing(2),
        })}
      >
        <AccountCircle
          sx={{
            fontSize: typography.h5,
            color: palette.text.secondary,
          }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: '20px',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <Typography
          sx={{
            fontSize: typography.h6,
            color: palette.text.secondary,
            mx: spacing(2),
            my: spacing(1),
          }}
        >
          {`${t('Hi, ')}${userName}${t('!')}`}
        </Typography>

        <Divider />

        <Link href={`/profile/${userId}`} underline="none">
          <MenuItem onClick={handleMenuClose}>
            <AccountCircle
              sx={{
                fontSize: typography.h5,
                color: palette.text.secondary,
                mr: spacing(2),
                mt: spacing(1),
                mb: spacing(1),
              }}
            />
            <Typography
              sx={{
                fontSize: typography.subtitle2,
                color: palette.text.secondary,
                mr: spacing(2),
                mt: spacing(1),
                mb: spacing(1),
              }}
            >
              {t('Profile')}
            </Typography>
          </MenuItem>
        </Link>

        <Link href={`/profile/${userId}/edit-profile`} underline="none">
          <MenuItem onClick={handleMenuClose}>
            <EditIcon
              sx={{
                fontSize: typography.h5,
                color: palette.text.secondary,
                mr: spacing(2),
                mt: spacing(1),
                mb: spacing(1),
              }}
            />
            <Typography
              sx={{
                fontSize: typography.subtitle2,
                color: palette.text.secondary,
                mr: spacing(2),
                mt: spacing(1),
                mb: spacing(1),
              }}
            >
              {t('Edit Profile')}
            </Typography>
          </MenuItem>
        </Link>

        <Link href="/profile/change-password" underline="none">
          <MenuItem onClick={handleMenuClose}>
            <LockIcon
              sx={{
                fontSize: typography.h5,
                color: palette.text.secondary,
                mr: spacing(2),
                mt: spacing(1),
                mb: spacing(1),
              }}
            />
            <Typography
              sx={{
                fontSize: typography.subtitle2,
                color: palette.text.secondary,
                mr: spacing(2),
                mt: spacing(1),
                mb: spacing(1),
              }}
            >
              {t('Change Password')}
            </Typography>
          </MenuItem>
        </Link>

        <Link href="/bookmarks" underline="none">
          <MenuItem onClick={handleMenuClose}>
            <BookmarksIcon
              sx={{
                fontSize: typography.h5,
                color: palette.text.secondary,
                mr: spacing(2),
                mt: spacing(1),
                mb: spacing(1),
              }}
            />
            <Typography
              sx={{
                fontSize: typography.subtitle2,
                color: palette.text.secondary,
                mr: spacing(2),
                mt: spacing(1),
                mb: spacing(1),
              }}
            >
              {t('Bookmarks')}
            </Typography>
          </MenuItem>
        </Link>

        <MenuItem onClick={handleLogOut}>
          <LogoutIcon
            sx={{
              fontSize: typography.h5,
              color: palette.text.secondary,
              mr: spacing(2),
              mt: spacing(1),
              mb: spacing(1),
            }}
          />
          <Typography
            sx={{
              fontSize: typography.subtitle2,
              color: palette.text.secondary,
              mr: spacing(2),
              mt: spacing(1),
              mb: spacing(1),
            }}
          >
            {t('Log Out')}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
