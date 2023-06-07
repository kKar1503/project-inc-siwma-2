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
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { useState, Fragment, MouseEvent, ChangeEvent } from 'react';
import { Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export type MobileDrawerProps = {
  userId: string | undefined;
  language: 'English' | 'Chinese';
};

const MobileDrawer = ({ userId, language }: MobileDrawerProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [drawerLang, setDrawerLang] = useState(language);

  const { typography, palette } = useTheme();

  const handleProfileClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setOpenProfile(!openProfile);
  };

  const mobileDrawerLanuageChange = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setDrawerLang(drawerLang === 'English' ? 'Chinese' : 'English');
  };

  const toggleDrawer = (openState: boolean) => () => {
    setOpenDrawer(openState);
  };

  const list = () => (
    <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List sx={{ width: 250, bgcolor: 'background.paper', height: '100vh' }}>
        <Link href="/" underline="none">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon sx={{ color: palette.grey[600] }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link href="/categories" underline="none">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon sx={{ color: palette.grey[600] }} />
              </ListItemIcon>
              <ListItemText primary="All Categories" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link href="/create-listing" underline="none">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddCircleIcon sx={{ color: palette.grey[600] }} />
              </ListItemIcon>
              <ListItemText primary="Add Listing" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={handleProfileClick}>
            <ListItemIcon>
              <AccountCircle sx={{ color: palette.grey[600] }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
            {openProfile ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openProfile} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href={`/profile/${userId}`} underline="none">
              <ListItemButton>
                <ListItemIcon sx={({ spacing }) => ({ pl: spacing(2) })}>
                  <PersonOutlineIcon sx={{ color: palette.grey[600] }} />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>
            </Link>

            <Link href={`/profile/${userId}/edit-profile`} underline="none">
              <ListItemButton>
                <ListItemIcon sx={({ spacing }) => ({ pl: spacing(2) })}>
                  <EditIcon sx={{ color: palette.grey[600] }} />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
            </Link>

            {/* update link when page ready */}
            <Link href={`/profile/${userId}/change-password`} underline="none">
              <ListItemButton>
                <ListItemIcon sx={({ spacing }) => ({ pl: spacing(2) })}>
                  <LockIcon sx={{ color: palette.grey[600] }} />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <Link href="/chat" underline="none">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon sx={{ color: palette.grey[600] }} />
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItemButton>
          </ListItem>
        </Link>

        {/* update with logic when ready */}
        <Link href="/" underline="none">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon sx={{ color: palette.grey[600] }} />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItem disablePadding sx={{ position: 'absolute', bottom: 0 }}>
          <ListItemButton onClick={mobileDrawerLanuageChange}>
            <Grid component="label" container alignItems="center">
              <Grid sx={{ fontSize: typography.subtitle2 }} item>
                EN
              </Grid>
              <Grid item>
                <Switch checked={drawerLang === 'Chinese'} value="checked" />
              </Grid>
              <Grid sx={{ fontSize: typography.subtitle2 }} item>
                CN
              </Grid>
            </Grid>
          </ListItemButton>
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
