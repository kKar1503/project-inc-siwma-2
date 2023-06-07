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
import Link from '@mui/material/Link';
import { useResponsiveness } from '@inc/ui';
import { useTheme } from '@mui/material/styles';

export type UserNameProps = {
  userName: string | undefined;
  userId: string | undefined;
};

const Profile = ({ userName, userId }: UserNameProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const { typography, palette, spacing } = useTheme();

  const isMenuOpen = anchorEl !== null;

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="medium"
        onClick={handleProfileMenuOpen}
        sx={({ spacing }) => ({
          ml: isMd ? spacing(1) : spacing(2),
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
          Hi, {userName}!
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
              Profile
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
              Edit Profile
            </Typography>
          </MenuItem>
        </Link>

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
            Change Password
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
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
            Log Out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
