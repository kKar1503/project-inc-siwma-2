import React, { useState, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import TranslateIcon from '@mui/icons-material/Translate';
import MessageIcon from '@mui/icons-material/Message';
import Link from '@mui/material/Link';
import Image from 'next/image';
import SearchBar from '@inc/ui/lib/components/SearchBar';
import AddListing from './AddListing';
import Profile from './Profile';


const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  // const renderMobileMenu = (
    
  // );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
      
        <Image src='/../public/images/favicons/logo.png' alt='logo' width={50} height={40}/>


        <Link href="https://github.com/kKar1503/project-inc-siwma-2" underline="none">
          <Typography
            noWrap
            fontSize={12}
            paddingRight='1rem'
            paddingLeft='2rem'
            color='#424242'
          >
            Home
          </Typography>
        </Link>

        <Link href="https://github.com/kKar1503/project-inc-siwma-2" underline="none">
          <Typography
            noWrap
            fontSize={12}
            paddingRight='1rem'
            paddingLeft='1rem'
            color='#424242'
          >
            All Categories
          </Typography>
        </Link>
        <SearchBar/>

        <AddListing/>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

          <IconButton size="medium" sx={{marginLeft: '1rem'}}>
            <TranslateIcon sx={{color: '#424242', fontSize: '22px'}}/>
          </IconButton>

          <IconButton size="medium" sx={{marginLeft: '1rem'}}>
            <Badge> 
              <MessageIcon sx={{color: '#424242', fontSize: '22px'}}/>
            </Badge>
          </IconButton>

          <IconButton size="medium" sx={{marginLeft: '1rem'}}>
            <Badge>
              <NotificationsIcon sx={{color: '#424242', fontSize: '22px'}}/>
            </Badge>
          </IconButton>

          <Profile/>

        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>

          <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <IconButton size="medium" sx={{marginLeft: '1rem'}}>
                <TranslateIcon sx={{color: '#424242', fontSize: '22px'}}/>
              </IconButton>
              <Typography fontSize={10}
                color='#424242'
                sx={{paddingRight: '2rem', paddingLeft: '0.5rem'}}
              >
                Translate
              </Typography>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <IconButton size="medium" sx={{marginLeft: '1rem'}}>
                <Badge> 
                  <MessageIcon sx={{color: '#424242', fontSize: '22px'}}/>
                </Badge>
              </IconButton>
              <Typography 
                fontSize={10}
                color='#424242'
                sx={{paddingLeft: '0.5rem'}}
              >
                Message
              </Typography>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <IconButton size="medium" sx={{marginLeft: '1rem'}}>
                <Badge>
                  <NotificationsIcon sx={{color: '#424242', fontSize: '22px'}}/>
                </Badge>
              </IconButton>
              <Typography 
                  fontSize={10}
                  color='#424242'
                  sx={{paddingLeft: '0.5rem'}}
                >
                    Notification
                </Typography>
            </MenuItem>

            <MenuItem>
              <Profile/>
              <Typography 
                fontSize={10}
                color='#424242'
                sx={{paddingLeft: '0.5rem'}}
              >
                Profile
              </Typography>
            </MenuItem>

          </Menu>
          
        </Box>
      </Toolbar>
    </Box>
  );
}

export default NavBar;