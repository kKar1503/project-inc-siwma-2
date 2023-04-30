import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TranslateIcon from '@mui/icons-material/Translate';
import MessageIcon from '@mui/icons-material/Message';
import SearchBar from './searchbar';
import Link from '@mui/material/Link';
import Image from 'next/image';
import AddListing from './addlisting';
import Profile from './profile';



export default function Navbar() {
  

  return (
    <Box 
      display='flex' 
      justifyContent='center' 
      alignItems='center'  
      width='100%'
      sx={{ flexGrow: 1}}
    >
      <Image src='/logo.png' alt='logo' width={40} height={30}/>

      <Link href="#" underline="none">
        <Typography
          noWrap
          fontSize={10}
          paddingRight={'1rem'}
          paddingLeft={'2rem'}
          color={'#424242'}
        >
          Home
        </Typography>
      </Link>

      <Link href="#" underline="none">
        <Typography
          noWrap
          fontSize={10}
          paddingRight={'1rem'}
          paddingLeft={'1rem'}
          color={'#424242'}
        >
          All Categories
        </Typography>
      </Link>

      <SearchBar/>

      <AddListing/>

      <IconButton size="medium" sx={{marginLeft: '1rem'}}>
        <TranslateIcon sx={{color: '#424242', fontSize: '16px'}}/>
      </IconButton>

      <IconButton size="medium" sx={{marginLeft: '1rem'}}>
        <Badge> 
          <MessageIcon sx={{color: '#424242', fontSize: '16px'}}/>
        </Badge>
      </IconButton>

      <IconButton size="medium" sx={{marginLeft: '1rem'}}>
        <Badge>
          <NotificationsIcon sx={{color: '#424242', fontSize: '16px'}}/>
        </Badge>
      </IconButton>

      <Profile/>

      
    </Box>
  );
}