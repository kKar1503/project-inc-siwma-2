import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';

interface Chat {
  id: string;
  company: string;
  product: string;
  latestMessage: string;
  price?: number;
  inProgress: boolean;
  date: string;
  imageUrl: string;
}

const chats: Chat[] = [
  {
    id: '1',
    company: 'Metal1',
    product: 'Buying',
    latestMessage: 'Hey, are you still interested in buying?',
    price: 100,
    inProgress: true,
    imageUrl:
      'data:image/png;base64,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',
    date: '1/1/2023'
  },
  {
    id: '2',
    company: 'Metal2',
    product: 'Buying',
    latestMessage: 'Sure, what is the price?',
    price: 50,
    inProgress: false,
    imageUrl:
      'data:image/png;base64,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',
    date: '1/1/2023'
  },
  {
    id: '3',
    company: 'Metal3',
    product: 'Selling',
    latestMessage: 'I can offer 80, what do you think?',
    price: 80,
    inProgress: true,
    imageUrl:
      'data:image/png;base64,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',
    date: '1/1/2023'
  }
];

const ChatList = () => {
  const [category, setCategory] = useState('all');
  const [activeListItem, setActiveListItem] = useState<null | number>(null);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const filteredChats =
    category === 'all'
      ? chats
      : chats.filter((chat) => chat.inProgress && chat.product === category);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="h6">Conversations</Typography>
          <Typography
            variant="subtitle1"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {filteredChats.length} Active Chats
          </Typography>
        </Box>
        <FormControl
          variant="outlined"
          size="small"
          sx={{
            width: '120px',
            background: 'none',
            border: 'none',
            mb: 1
          }}
        >
          {/* <InputLabel>All Chats</InputLabel> */}
          <Select
            value={category}
            onChange={handleCategoryChange}
            sx={{
              '& .MuiSelect-select': { p: 0 },
              '& fieldset': {
                border: 'none'
              },
              '&::hover': {
                border: 'none'
              },
              '&::before': {
                border: 'none'
              },
              '&::after': {
                border: 'none'
              }
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Buying">Buying</MenuItem>
            <MenuItem value="Selling">Selling</MenuItem>
          </Select>
        </FormControl>
        <input
          placeholder="Search Message,Listings"
          style={{
            display: 'block',
            background: '#f6f6f6',
            padding: '10px 7px',
            borderRadius: '8px',
            outline: 'none',
            border: 'none'
          }}
        />
      </Box>

      <List sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
        {filteredChats.map((chat, index) => (
          <>
            <ListItem
              key={chat.id}
              sx={{ background: activeListItem === index ? '#f6f6f6' : 'none' }}
              onClick={() => {
                setActiveListItem(index);
              }}
            >
              <ListItemAvatar>
                {/* <Avatar>{chat.company[0]}</Avatar> */}
                <Badge overlap="circular" color="error" badgeContent="4">
                  <img
                    src={chat.imageUrl}
                    alt="profile_pic"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '100%'
                    }}
                  />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                sx={{ paddingLeft: '10px' }}
                primary={
                  <Box
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography>{chat.company}</Typography>
                    <Typography>{chat.date}</Typography>
                  </Box>
                }
                secondary={
                  <>
                    <Typography>{chat.latestMessage}</Typography>
                    <Typography
                      sx={{
                        display: 'inline',
                        color: chat.inProgress ? 'green' : 'gray',
                        mr: 1
                      }}
                    >
                      {chat.inProgress
                        ? 'In progress'
                        : `Offered price: $${chat.price}`}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {filteredChats.length - 1 !== index && <Divider component="li" />}
          </>
        ))}
      </List>
    </>
  );
};

export default ChatList;
