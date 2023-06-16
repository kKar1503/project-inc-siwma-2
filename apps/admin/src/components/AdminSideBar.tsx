import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import Image from 'next/image';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

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
        logo: '/images/favicons/users-icon.png',
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
  const router = useRouter();

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

  const handleClick = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  return (
    <Box
      sx={{
        width: '20%',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '2em 0',
          }}
        >
          <div style={{ marginBottom: '1em' }}>
            <Image
              src="/images/favicons/SIWMA-icon.png"
              alt="Company Logo"
              width={100}
              height={70}
            />
          </div>
        </div>
        <h2>General</h2>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <div key={item.name}>
              <ListItem
                button
                onClick={() => handleClick(item.name)}
                style={{
                  backgroundColor: isCurrentRoute(item.link) ? '#EAEFFC' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ marginRight: '1em' }}>
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
                </div>
                <Link href={item.link} underline="none">
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      style: {
                        color: isCurrentRoute(item.link) ? '#2962FF' : 'black',
                      },
                    }}
                  />
                </Link>
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
                    style={{
                      backgroundColor: isCurrentRoute(item.link) ? '#EAEFFC' : 'transparent',
                      paddingLeft: '2em',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ marginRight: '1em' }}>
                      {subitem.logo && (
                        <Image
                          src={
                            isCurrentRoute(subitem.link)
                              ? subitem.highlightedLogo || subitem.logo
                              : subitem.logo
                          }
                          alt="Logo"
                          width={24}
                          height={24}
                        />
                      )}
                    </div>
                    <Link href={item.link} underline="none">
                      <ListItemText
                        primary={subitem.name}
                        primaryTypographyProps={{
                          style: {
                            color: isCurrentRoute(subitem.link) ? '#2962FF' : 'black',
                          },
                        }}
                      />
                    </Link>
                  </ListItem>
                ))}
            </div>
          ))}
        </List>
      </div>
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginRight: '1em',
            }}
          >
            <Image src="/images/admin-bg.png" alt="Profile Picture" width={40} height={40} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>John Doe</div>
            <div style={{ fontSize: '14px', color: '#9E9E9E' }}>john.doe@example.com</div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default AdminSideBar;
