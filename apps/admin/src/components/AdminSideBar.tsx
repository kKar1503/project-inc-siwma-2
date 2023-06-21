import React, { useState, useEffect, useMemo } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Hidden,
  Avatar,
  Typography,
  useTheme,
} from '@mui/material';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import { useResponsiveness } from '@inc/ui';

const menuItems = [
  {
    name: 'Overview',
    link: '/overview',
    logo: '/images/favicons/overview-icon.png',
    highlightedLogo: '/images/favicons/overview-icon-blue.png',
  },
  {
    name: 'Data Analytics',
    link: '/dataAnalytics',
    logo: '/images/favicons/data-analytics-icon.png',
    highlightedLogo: '/images/favicons/data-analytics-icon-blue.png',
  },
  {
    name: 'Advertisement',
    link: '/advertisement',
    logo: '/images/favicons/advertisment-icon.png',
    highlightedLogo: '/images/favicons/advertisement-icon-blue.png',
    dropdown: [
      {
        name: 'Advertisement Dashboard',
        link: '/advertisement/dashboard',
        logo: '/images/favicons/advertisement-dashboard-icon.png',
        highlightedLogo: '/images/favicons/advertisement-dashboard-icon-blue.png',
      },
      {
        name: 'Advertisement Upload',
        link: '/advertisement/upload',
        logo: '/images/favicons/advertisement-upload-icon.png',
        highlightedLogo: '/images/favicons/advertisement-upload-icon-blue.png',
      },
    ],
  },
  {
    name: 'Category Management',
    link: '/categoryManagement',
    logo: '/images/favicons/category-management-icon.png',
    highlightedLogo: '/images/favicons/category-management-icon-blue.png',
    dropdown: [
      {
        name: 'Category',
        link: '/categoryManagement/category',
        logo: '/images/favicons/category-icon.png',
        highlightedLogo: '/images/favicons/category-icon-blue.png',
      },
      {
        name: 'Parameters',
        link: '/categoryManagement/parameters',
        logo: '/images/favicons/parameter-icon.png',
        highlightedLogo: '/images/favicons/parameter-icon-blue.png',
      },
    ],
  },
  {
    name: 'User Management',
    link: '/userManagement',
    logo: '/images/favicons/user-management-icon.png',
    highlightedLogo: '/images/favicons/user-management-icon-blue.png',
    dropdown: [
      {
        name: 'Companies',
        link: '/userManagement/companies',
        logo: '/images/favicons/companies-icon.png',
        highlightedLogo: '/images/favicons/companies-icon-blue.png',
      },
      {
        name: 'Users',
        link: '/userManagement/users',
        logo: '/images/favicons/users-icon.png',
        highlightedLogo: '/images/favicons/users-icon-blue.png',
      },
      {
        name: 'Invites',
        link: '/userManagement/invites',
        logo: '/images/favicons/invites-icon.png',
        highlightedLogo: '/images/favicons/invites-icon-blue.png',
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

  // function that fetches the user info from your backend
  function getUserInfo() {
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      imageUrl: '/images/admin-bg.png',
    };
  }

  useEffect(() => {
    // Assume that `getUserInfo` is a function that fetches the user info from your backend
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

  const isCurrentRoute = (path: string) => router.pathname.includes(path);
  const isCurrentSubRoute = (path: string) => router.pathname.startsWith(path);

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
          fontSize: typography.h6,
          fontWeight: 'bold',
        },
        email: {
          fontSize: typography.subtitle1,
          color: '#9E9E9E',
        },
      };
    }

    if (isMd) {
      return {
        name: {
          fontSize: typography.h6,
          fontWeight: 'bold',
        },
        email: {
          fontSize: typography.subtitle1,
          color: '#9E9E9E',
        },
      };
    }

    if (isLg) {
      return {
        name: {
          fontSize: typography.h5,
          fontWeight: 'bold',
        },
        email: {
          fontSize: typography.subtitle1,
          color: '#9E9E9E',
        },
      };
    }

    return {
      name: {
        fontSize: '24px',
        fontWeight: 'bold',
      },
      email: {
        fontSize: '14px',
        color: '#9E9E9E',
      },
    };
  }, [isSm, isMd, isLg, typography]);

  const drawer = (
    <Box
      sx={{
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
          General
        </Typography>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <Box key={item.name}>
              <ListItem
                button
                onClick={() => handleClick(item.name)}
                style={{
                  backgroundColor: isCurrentRoute(item.link) ? '#EAEFFC' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box style={{ marginRight: '1em' }}>
                  {item.logo && (
                    <Image
                      src={
                        isCurrentRoute(item.link) ? item.highlightedLogo || item.logo : item.logo
                      }
                      alt="Logo"
                      width={24}
                      height={24}
                    />
                  )}
                </Box>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    style: {
                      color: isCurrentRoute(item.link) ? '#2962FF' : 'black',
                    },
                  }}
                />
                {item.dropdown &&
                  (openDropdown === item.name ? (
                    <ExpandMore
                      style={{ color: isCurrentRoute(item.link) ? '#2962FF' : 'black' }}
                    />
                  ) : (
                    <ChevronRight style={{ color: 'black' }} />
                  ))}
              </ListItem>
              {item.dropdown &&
                openDropdown === item.name &&
                item.dropdown.map((subitem) => (
                  <ListItem
                    button
                    key={subitem.name}
                    sx={{
                      backgroundColor: isCurrentRoute(item.link) ? '#EAEFFC' : 'transparent',
                      pl: '2em',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box style={{ marginRight: '1em' }}>
                      {subitem.logo && (
                        <Image
                          src={
                            isCurrentSubRoute(subitem.link)
                              ? subitem.highlightedLogo || subitem.logo
                              : subitem.logo
                          }
                          alt="Logo"
                          width={24}
                          height={24}
                          objectFit="contain"
                        />
                      )}
                    </Box>
                    <ListItemText
                      primary={
                        <Link
                          href={subitem.link}
                          underline="none"
                          sx={{
                            color: isCurrentSubRoute(subitem.link) ? '#2962FF' : 'black',
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
                  </ListItem>
                ))}
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
            borderRadius: '0 0 15px 15px',
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
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer variant="permanent" open={isSideBarOpen}>
            {drawer}
          </Drawer>
        </Hidden>
      </Box>
    </Box>
  );
};

export default AdminSideBar;
