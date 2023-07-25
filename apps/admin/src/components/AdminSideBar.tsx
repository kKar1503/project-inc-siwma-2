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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import useUser from '@/middlewares/fetchUser';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useResponsiveness } from '@inc/ui';

const menuItems = [
  {
    name: 'Overview',
    link: '/overview',
    Icon: HomeIcon,
  },
  {
    name: 'Advertisement',
    link: '/advertisement',
    Icon: SpaceDashboardIcon,
    dropdown: [
      {
        name: 'Advertisement Dashboard',
        link: '/advertisement-dashboard',
        Icon: AssessmentIcon,
      },
      {
        name: 'Advertisement Upload',
        link: '/advertisement-upload',
        Icon: UploadIcon,
      },
    ],
  },
  {
    name: 'Category Management',
    link: '/category-management',
    Icon: CategoryIcon,
    dropdown: [
      {
        name: 'Category',
        link: '/category',
        Icon: BusinessIcon,
      },
      {
        name: 'Parameters',
        link: '/parameters',
        Icon: FormatListNumberedRtlIcon,
      },
    ],
  },
  {
    name: 'Listing',
    link: '/listing',
    Icon: FormatListBulletedIcon,
    dropdown: [
      {
        name: 'All Listing',
        link: '/all-listings',
        Icon: FormatListBulletedIcon,
      },
      {
        name: 'Listing Items',
        link: '/listing-items',
        Icon: FeaturedPlayListOutlinedIcon,
      },
    ],
  },
  {
    name: 'User Management',
    link: '/user-management',
    Icon: SettingsAccessibilityIcon,
    dropdown: [
      {
        name: 'Companies',
        link: '/companies',
        Icon: ApartmentIcon,
      },
      {
        name: 'Users',
        link: '/users',
        Icon: PeopleAltIcon,
      },
      {
        name: 'Invites',
        link: '/invites',
        Icon: PersonAddIcon,
      },
    ],
  },
];


const AdminSideBar = () => {
  const loginUser = useSession();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', imageUrl: '' });
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { palette, typography } = useTheme();
  const router = useRouter();
  const customBlue = '#2962ff';
  const blueBackground = '#EAEFFC';

  const loggedUserUuid = loginUser.data?.user.id as string;

    const {
      data: currentUser,
      error: userError,
      isError: isUserError,
      isFetched: isUserFetched,
    } = useUser(loggedUserUuid);

  // function that fetches the user info from backend
  function getUserInfo() {
    return {
      name: currentUser?.name || (''),
      email:currentUser?.email || (''),
      imageUrl:currentUser?.profilePic ? currentUser.profilePic : ('/images/placeholder.png') ,
    };
  }

  useEffect(() => {
    if (!isUserFetched) {
      return;
    }

    if (isUserError) {
      if ('status' in (userError as any) && (userError as any).status === 404) {
        router.replace('/404');
        return;
      }

      router.replace('/500');
      return;
    }

    if (user === undefined) {
      router.replace('/500');
    }
    // Assume that `getUserInfo` is a function that fetches the user info from backend
    if (currentUser) {
      const userInfo = getUserInfo();
      setUser(userInfo);
    }
  }, [currentUser, isUserFetched]);

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
          ...typography.subtitle1,
          fontWeight: 'bold',
          color: palette.common.black,
        },
        email: {
          ...typography.body2,
          color: palette.grey[500],
        },
      };
    }

    if (isMd) {
      return {
        name: {
          ...typography.subtitle1,
          fontWeight: 'bold',
          color: palette.common.black,
        },
        email: {
          ...typography.body2,
          color: palette.grey[500],
        },
      };
    }

    if (isLg) {
      return {
        name: {
          ...typography.h6,
          fontWeight: 'bold',
          color: palette.common.black,
        },
        email: {
          ...typography.body1,
          color: palette.grey[500],
        },
      };
    }

    return {
      name: {
        ...typography.h4,
        fontWeight: 'bold',
        color: palette.common.black,
      },
      email: {
        ...typography.subtitle1,
        color: palette.grey[500],
      },
    };
  }, [isSm, isMd, isLg, typography]);



  const drawer = (
    <Box
      sx={{
        width: '290px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowX: 'hidden',
        position: 'fixed',
        top: 0,
        bottom: 0,
        overflowY: 'auto',
        backgroundColor: palette.primary.main,
      }}
    >
      <Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '2em 0',
            padding: '1em',
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
          sx={{ font: 'bold 1.8rem Roboto, sans-serif', marginBottom: '16px', marginLeft: '0.5em' }}
        >
          General
        </Typography>
        <Divider />
        <List>
  {menuItems.map((item) => (
    <Box key={item.name}>
      {item.dropdown ? ( 
        <ListItemButton
          onClick={() => handleClick(item.name)}
          sx={{
            backgroundColor: isCurrentRoute(item.link) ? blueBackground : 'transparent',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit', 
          }}
        >
          <Box style={{ marginRight: '1em', display: 'flex', alignItems: 'center' }}>
            <item.Icon
              style={{
                color: isCurrentRoute(item.link) ? customBlue : palette.common.black,
              }}
            />
          </Box>
          <ListItemText
            primary={item.name}
            primaryTypographyProps={{
              style: {
                font: '0.9rem Roboto, sans-serif',
              },
            }}
          />
          {openDropdown === item.name ? <ExpandMore /> : <ChevronRight />}
        </ListItemButton>
      ) : (
        <ListItemButton
          component="a"
          href={item.link}
          onClick={() => handleClick(item.name)}
          sx={{
            backgroundColor: isCurrentRoute(item.link) ? blueBackground : 'transparent',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none', 
            color: 'inherit', 
          }}
        >
          <Box style={{ marginRight: '1em', display: 'flex', alignItems: 'center' }}>
            <item.Icon
              style={{
                color: isCurrentRoute(item.link) ? customBlue : palette.common.black,
              }}
            />
          </Box>
          <ListItemText
            primary={item.name}
            primaryTypographyProps={{
              style: {
                font: '0.9rem Roboto, sans-serif',
              },
            }}
          />
        </ListItemButton>
      )}
      {item.dropdown && (
        <Collapse in={openDropdown === item.name} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.dropdown.map((subitem) => (
              <ListItemButton
                key={subitem.name}
                href={subitem.link}
                onClick={() => handleClick(subitem.link)}
                sx={{
                  backgroundColor: isCurrentSubRoute(subitem.link)
                    ? blueBackground
                    : 'transparent',
                  pl: '2em',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none', 
                  color: 'inherit',   
                }}
              >
                <Box style={{ marginRight: '1em', display: 'flex', alignItems: 'center' }}>
                  <subitem.Icon
                    style={{
                      color: isCurrentSubRoute(subitem.link)
                        ? customBlue
                        : palette.common.black,
                    }}
                  />
                </Box>
                <ListItemText
                  primary={
                    <Link
                      href={subitem.link}
                      underline="none"
                      sx={{
                        color: isCurrentSubRoute(subitem.link)
                          ? customBlue
                          : palette.common.black,
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
            backgroundColor: palette.secondary.main,
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
            bgcolor: palette.common.white,
            boxShadow: 'none',
            borderBottom: 1,
            borderColor: '#dbdbdb',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: palette.common.black }}
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
