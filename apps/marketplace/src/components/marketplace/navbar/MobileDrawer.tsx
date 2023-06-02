import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TranslateIcon from '@mui/icons-material/Translate';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import { useTheme } from '@mui/material/styles';
import { useState, Fragment, MouseEvent } from 'react';
import { Link } from '@mui/material';

const MobileDrawer = ({ userId }: { userId: string | undefined }) => {
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const handleLanguageClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setOpenLanguage(!openLanguage);
  };

  const handleProfileClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setOpenProfile(!openProfile);
  };

  const toggleDrawer = (openState: boolean) => () => {
    setOpenDrawer(openState);
  };

  const addList = {
    color: theme.palette.primary.main,
  };

  const list = () => (
    <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List sx={{ width: 250, bgcolor: 'background.paper' }}>
        <ListItem disablePadding>
          <Link href="/" underline="none">
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon sx={{ color: theme.palette.grey[600] }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link href="/categories" underline="none">
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon sx={{ color: theme.palette.grey[600] }} />
              </ListItemIcon>
              <ListItemText primary="All Categories" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link href="/create-listing" underline="none">
            <ListItemButton>
              <ListItemIcon>
                <AddCircleIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ style: addList }} primary="Add Listing" />
            </ListItemButton>
          </Link>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={handleProfileClick}>
            <ListItemIcon>
              <AccountCircle sx={{ color: theme.palette.grey[600] }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
            {openProfile ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openProfile} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href={`/profile/${userId}`} underline="none">
              <ListItemButton>
                <ListItemIcon sx={{ pl: theme.spacing(2) }}>
                  <PersonOutlineIcon sx={{ color: theme.palette.grey[600] }} />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>
            </Link>

            <Link href={`/profile/${userId}/edit-profile`} underline="none">
              <ListItemButton>
                <ListItemIcon sx={{ pl: theme.spacing(2) }}>
                  <EditIcon sx={{ color: theme.palette.grey[600] }} />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
            </Link>

            {/* update link when page ready */}
            <Link href={`/profile/${userId}/change-password`} underline="none">
              <ListItemButton>
                <ListItemIcon sx={{ pl: theme.spacing(2) }}>
                  <LockIcon sx={{ color: theme.palette.grey[600] }} />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <Link href="/chat" underline="none">
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon sx={{ color: theme.palette.grey[600] }} />
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          {/* no link, dropdown to english and chinese options */}
          <ListItemButton onClick={handleLanguageClick}>
            <ListItemIcon>
              <TranslateIcon sx={{ color: theme.palette.grey[600] }} />
            </ListItemIcon>
            <ListItemText primary="Language" />
            {openLanguage ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openLanguage} timeout="auto" unmountOnExit>
          {/* add logic when translate function in */}
          <List component="div" disablePadding>
            <ListItemButton>
              <ListItemText sx={{ pl: theme.spacing(2) }} primary="English" />
            </ListItemButton>

            <ListItemButton>
              <ListItemText sx={{ pl: theme.spacing(2) }} primary="Chinese" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* update with logic when ready */}
        <ListItem disablePadding>
          <Link href="/" underline="none">
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon sx={{ color: theme.palette.grey[600] }} />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Fragment key="right">
        <IconButton
          size="medium"
          onClick={toggleDrawer(true)}
          color="inherit"
          sx={({ spacing }) => ({
            ml: spacing(2),
          })}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="right"
          open={openDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </Fragment>
    </div>
  );
};

export default MobileDrawer;
