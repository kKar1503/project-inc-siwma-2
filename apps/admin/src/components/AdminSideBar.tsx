import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

const menuItems = [
  { name: 'Overview', link: '/overview' },
  { name: 'Data Analytics', link: '/data-analytics' },
  {
    name: 'Advertisement',
    link: '/advertisement',
    dropdown: [
      { name: 'Subitem 1', link: '/subitem-1' },
      { name: 'Subitem 2', link: '/subitem-2' },
    ],
  },
  {
    name: 'Category Management',
    link: '/categoryManagement',
    dropdown: [
      { name: 'Category', link: '/categoryManagement/category' },
      { name: 'Parameters', link: '/categoryManagement/parameters' },
    ],
  },
  {
    name: 'User Management',
    link: '/user-management',
    dropdown: [
      { name: 'Subitem 1', link: '/subitem-1' },
      { name: 'Subitem 2', link: '/subitem-2' },
    ],
  },
];

const AdminNavBar = () => {
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

  const isCurrentRoute = (path: string) =>
    router.pathname === path || router.pathname.includes(path);

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
        borderRight: '1px solid grey',
        padding: '1em',
      }}
    >
      <div>
        <div>
          <Image src="/images/favicons/SIWMA-icon.png" alt="Company Logo" width={50} height={50} />
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
                }}
              >
                <Link href={item.link} passHref>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      style: {
                        color: isCurrentRoute(item.link) ? '#2962FF' : 'black',
                        textDecoration: 'none',
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
                    }}
                  >
                    <Link href={subitem.link} passHref>
                      <ListItemText
                        primary={subitem.name}
                        primaryTypographyProps={{
                          style: {
                            color: isCurrentRoute(subitem.link) ? '#2962FF' : 'black',
                            textDecoration: 'none',
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
    </Box>
  );
};

export default AdminNavBar;
