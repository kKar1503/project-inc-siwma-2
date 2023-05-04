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

const Profile = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  // const renderMenu = (
    
  // );
  return (
    <>
    
      <IconButton size="medium" onClick={handleProfileMenuOpen} sx={{marginLeft: '1rem'}}>
        <AccountCircle sx={{color: '#424242', fontSize: '22px'}}/>
      </IconButton>

      <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      
      <Typography
          fontSize={12}
          color='#424242'
          padding='0.5rem'
          paddingRight='6rem'
          paddingLeft='1rem'
      >
        Hi, Name!
      </Typography>

      <Divider />

      <MenuItem onClick={handleMenuClose}>
        <AccountCircle sx={{paddingRight: '1rem', fontSize: '20px'}}/>
        <Typography
          fontSize={12}
          color='#424242'
        >
          Profile
        </Typography>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <EditIcon sx={{paddingRight: '1rem', fontSize: '20px'}}/>
        <Typography
          fontSize={12}
          color='#424242'
        >
          Edit Profile
        </Typography>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <LockIcon sx={{paddingRight: '1rem', fontSize: '20px'}}/>
        <Typography
          fontSize={12}
          color='#424242'
        >
          Change Password
        </Typography>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <EditNotificationsIcon sx={{paddingRight: '1rem', fontSize: '20px'}}/>
        <Typography
          fontSize={12}
          color='#424242'
        >
          Notification Preference
        </Typography>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <LogoutIcon sx={{paddingRight: '1rem', fontSize: '20px'}}/>
        <Typography
          fontSize={12}
          color='#424242'
        >
          Log Out
        </Typography>
      </MenuItem>

    </Menu>
    </>
  )
}

export default Profile;