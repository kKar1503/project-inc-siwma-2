import React, { useState, useEffect, useMemo } from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import UploadIcon from '@mui/icons-material/Upload';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useResponsiveness } from '@inc/ui';

const menuItems = [
  {
    name: 'Overview',
    link: '/overview',
    Icon: HomeIcon,
  },
  {
    name: 'Data Analytics',
    link: '/dataAnalytics',
    Icon: BarChartIcon,
  },
  {
    name: 'Advertisement',
    link: '/advertisement',
    Icon: SpaceDashboardIcon,
    dropdown: [
      {
        name: 'Advertisement Dashboard',
        link: '/advertisement/dashboard',
        Icon: AssessmentIcon,
      },
      {
        name: 'Advertisement Upload',
        link: '/advertisement/upload',
        Icon: UploadIcon,
      },
    ],
  },
  {
    name: 'Category Management',
    link: '/categoryManagement',
    Icon: CategoryIcon,
    dropdown: [
      {
        name: 'Category',
        link: '/categoryManagement/category',
        Icon: BusinessIcon,
      },
      {
        name: 'Parameters',
        link: '/categoryManagement/parameters',
        Icon: FormatListNumberedRtlIcon,
      },
    ],
  },
  {
    name: 'User Management',
    link: '/userManagement',
    Icon: SettingsAccessibilityIcon,
    dropdown: [
      {
        name: 'Companies',
        link: '/userManagement/companies',
        Icon: ApartmentIcon,
      },
      {
        name: 'Users',
        link: '/userManagement/users',
        Icon: PeopleAltIcon,
      },
      {
        name: 'Invites',
        link: '/userManagement/invites',
        Icon: PersonAddIcon,
      },
    ],
  },
];

const AdminSideBar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', imageUrl: '' });
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { typography } = useTheme();
  const router = useRouter();

  // function that fetches the user info from backend
  function getUserInfo() {
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      imageUrl: '/images/admin-bg.png',
    };
  }

  useEffect(() => {
    // Assume that `getUserInfo` is a function that fetches the user info from backend
    const userInfo = getUserInfo();
    setUser(userInfo);
  }, []);

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.dropdown) {
        item.dropdown.forEach((subitem) => {
          if (router.pathname.includes(subitem.link)) {
            setOpenDropdown(item.name);
          }
        });
      }
    });
  }, [router.pathname]);

  const handleDrawerToggle = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClick = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const textStyles = useMemo(() => {
    if (isSm) {
      return {
        name: {
          font: 'bold 1rem Roboto, sans-serif',
          color: '#000',
        },
        email: {
          fontSize: typography.subtitle1,
          font: 'bold 0.8rem Roboto, sans-serif',
          color: '#9E9E9E',
        },
      };
    }

    if (isMd) {
      return {
        name: {
          font: 'bold 1.2rem Roboto, sans-serif',
          color: '#000',
        },
        email: {
          fontSize: typography.subtitle1,
          font: 'bold 0.8rem Roboto, sans-serif',
          color: '#9E9E9E',
        },
      };
    }

    if (isLg) {
      return {
        name: {
          font: 'bold 1.2rem Roboto, sans-serif',
          color: '#000',
        },
        email: {
          fontSize: typography.subtitle1,
          font: 'bold 0.8rem Roboto, sans-serif',
          color: '#9E9E9E',
        },
      };
    }

    return {
      name: {
        fontSize: '24px',
        font: 'bold 1.2rem Roboto, sans-serif',
        color: '#000',
      },
      email: {
        font: 'bold 0.8rem Roboto, sans-serif',
        color: '#9E9E9E',
      },
    };
  }, [isSm, isMd, isLg, typography]);

  const drawer = (
    <Box
      sx={{
        width: '290px',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowX: 'hidden',
        position: 'fixed',
        top: 0,
        bottom: 0,
        overflowY: 'auto',
        backgroundColor: '#fff',
      }}
    >
      <Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '2em 0',
          }}
        >
          <Box style={{ marginBottom: '1em' }}>
            <Image
              src="/images/favicons/SIWMA-icon.png"
              alt="Company Logo"
              width={100}
              height={70}
              objectFit="contain"
            />
          </Box>
        </Box>
        <Typography
          variant="h4"
          sx={{ font: 'bold 1.8rem Roboto, sans-serif', marginBottom: '16px' }}
        >
          General
        </Typography>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <Box key={item.name}>
              <ListItemButton
                onClick={() => handleClick(item.name)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box style={{ marginRight: '1em' }}>
                  <item.Icon style={{ color: 'black' }} />
                </Box>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    style: {
                      color: 'black',
                      font: '0.9rem Roboto, sans-serif',
                    },
                  }}
                />
                {item.dropdown &&
                  (openDropdown === item.name ? (
                    <ExpandMore />
                  ) : (
                    <ChevronRight style={{ color: 'black' }} />
                  ))}
              </ListItemButton>
              {item.dropdown && (
                <Collapse in={openDropdown === item.name} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.dropdown.map((subitem) => (
                      <ListItemButton
                        key={subitem.name}
                        onClick={() => router.push(subitem.link)}
                        sx={{
                          pl: '2em',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Box style={{ marginRight: '1em' }}>
                          <subitem.Icon style={{ color: 'black' }} />
                        </Box>
                        <ListItemText
                          primary={
                            <Link
                              href={subitem.link}
                              underline="none"
                              sx={{
                                color: 'black',
                                font: '0.9rem Roboto, sans-serif',
                                textDecoration: 'none',
                                '&:hover': {
                                  textDecoration: 'none',
                                },
                              }}
                            >
                              {subitem.name}
                            </Link>
                          }
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Box>
      <Hidden mdDown implementation="css">
        <Box
          sx={{
            backgroundColor: '#F7F7F8',
            padding: '1em',
            display: 'flex',
            alignItems: 'flex-end',
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}
        >
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginRight: '1em',
              }}
            >
              <Image src={user.imageUrl} alt="Profile Picture" width={40} height={40} />
            </Box>
            <Box>
              <Typography sx={textStyles?.name}>{user.name}</Typography>
              <Typography sx={textStyles?.email}>{user.email}</Typography>
            </Box>
          </Box>
        </Box>
      </Hidden>
    </Box>
  );

  return (
    <Box>
      <Hidden mdUp>
        <AppBar
          position="fixed"
          sx={{
            bgcolor: '#ffffff',
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
            <Box style={{ flexGrow: 1 }} />
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
                marginRight: '1em',
              }}
            >
              <Typography variant="h6" sx={textStyles?.name}>
                {user.name}
              </Typography>
              <Typography variant="subtitle1" sx={textStyles?.email}>
                {user.email}
              </Typography>
            </Box>
            <Avatar alt="Profile Picture" src={user.imageUrl} />
          </Toolbar>
        </AppBar>
      </Hidden>
      <Box>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            open={isSideBarOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{ overflowX: 'hidden' }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer variant="permanent" open={isSideBarOpen} sx={{ overflowX: 'hidden' }}>
            {drawer}
          </Drawer>
        </Hidden>
      </Box>
    </Box>
  );
};

export default AdminSideBar;
