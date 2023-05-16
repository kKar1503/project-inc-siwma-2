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
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';

export type UserNameProps = {
  userName: string;
};

const Profile = ({ userName }: UserNameProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
          ml: spacing(2),
        })}
      >
        <AccountCircle
          sx={({ typography, palette }) => ({
            fontSize: typography.h5,
            color: palette.text.secondary,
          })}
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
      >
        <Typography
          sx={({ spacing, typography, palette }) => ({
            fontSize: typography.h6,
            color: palette.text.secondary,
            ml: spacing(2),
            mb: spacing(1),
          })}
        >
          Hi, {userName}!
        </Typography>

        <Divider />

        <MenuItem onClick={handleMenuClose}>
          <AccountCircle
            sx={({ spacing, typography, palette }) => ({
              fontSize: typography.h5,
              color: palette.text.secondary,
              mr: spacing(2),
              mt: spacing(1),
              mb: spacing(1),
            })}
          />
          <Typography
            sx={({ spacing, typography, palette }) => ({
              fontSize: typography.subtitle2,
              color: palette.text.secondary,
              mr: spacing(2),
              mt: spacing(1),
              mb: spacing(1),
            })}
          >
            Profile
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <EditIcon
            sx={({ spacing, typography, palette }) => ({
              fontSize: typography.h5,
              color: palette.text.secondary,
              mr: spacing(2),
              mt: spacing(1),
              mb: spacing(1),
            })}
          />
          <Typography
            sx={({ spacing, typography, palette }) => ({
              fontSize: typography.subtitle2,
              color: palette.text.secondary,
              mr: spacing(2),
              mt: spacing(1),
              mb: spacing(1),
            })}
          >
            Edit Profile
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <LockIcon
            sx={({ spacing, typography, palette }) => ({
              fontSize: typography.h5,
              color: palette.text.secondary,
              mr: spacing(2),
              mt: spacing(1),
              mb: spacing(1),
            })}
          />
          <Typography
            sx={({ spacing, typography, palette }) => ({
              fontSize: typography.subtitle2,
              color: palette.text.secondary,
              mr: spacing(2),
              mt: spacing(1),
              mb: spacing(1),
            })}
          >
            Change Password
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <EditNotificationsIcon
            sx={({ spacing, typography, palette }) => ({
              fontSize: typography.h5,
              color: palette.text.secondary,
              mr: spacing(2),
              mt: spacing(1),
              mb: spacing(1),
            })}
          />
          <Typography
            sx={({ spacing, typography, palette }) => ({
              fontSize: typography.subtitle2,
              color: palette.text.secondary,
              mr: spacing(2),
              mt: spacing(1),
              mb: spacing(1),
            })}
          >
            Notification Preference
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <LogoutIcon
            sx={({ spacing, typography, palette }) => ({
              fontSize: typography.h5,
              color: palette.text.secondary,
              mr: spacing(2),
              mt: spacing(1),
            })}
          />
          <Typography
            sx={({ spacing, typography, palette }) => ({
              fontSize: typography.subtitle2,
              color: palette.text.secondary,
              mr: spacing(2),
              mt: spacing(1),
              mb: spacing(1),
            })}
          >
            Log Out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
