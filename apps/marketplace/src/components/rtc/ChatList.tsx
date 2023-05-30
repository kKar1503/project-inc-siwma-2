import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import { TextField, alpha } from '@mui/material';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import Image from 'next/image';
import { DateTime } from 'luxon';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';

export interface ChatListProps {
  id: string;
  company: string;
  category: string;
  latestMessage: string;
  price: number;
  itemName: string;
  inProgress: boolean;
  date: string;
  imageUrl: string;
  badgeContent: number;
}
type CategoryType = 'all' | 'Buying' | 'Selling';

const ChatList = ({
  chats,
  onChange,
  selectChat,
  setSelectChat,
}: {
  chats: ChatListProps[];
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  selectChat: string;
  setSelectChat: (val: string) => void;
}) => {
  const [category, setCategory] = useState<CategoryType>('all');
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const myColor = alpha('#000000', 0.04);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as CategoryType);
  };

  const filteredChats = (category: CategoryType, chats: ChatListProps[]) => {
    if (category.toLowerCase() === 'all') {
      return chats.filter((chat) => chat.inProgress);
    }
    const filteredItems = chats.filter(
      (chat) => chat.category.toLowerCase() === category.toLowerCase() && chat.inProgress
    );
    return filteredItems;
  };

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, shape, shadows, palette, typography } = useTheme();

  const chatListStyles = useMemo(() => {
    if (isSm) {
      return {
        listHeader: {
          pb: spacing(1),
          pt: spacing(2),
          px: spacing(2),
        },
        listTitle: {
          color: palette.common.black,
          fontSize: '1.2rem',
        },
        activeChat: {
          display: 'flex',
          alignItems: 'center',
          // Apply alpha transparency to black color
          color: alpha(palette.common.black, 0.3),
          fontSize: '0.8rem',
        },
        searchBar: {
          fontSize: '0.8rem',
        },
        listImage: {
          width: 50,
          height: 50,
        },
        companyText: {
          fontSize: '1rem',
        },
        dateTime: {
          fontSize: '0.7rem',
        },
        productText: {
          fontSize: '0.9rem',
        },
        latestMessage: {
          fontSize: typography.body1,
        },
        progressText: {
          fontSize: '0.8rem',
        },
      };
    }
    if (isMd) {
      return {
        listHeader: {
          pb: spacing(1),
          pt: spacing(2),
          px: spacing(2),
        },
        listTitle: {
          color: palette.common.black,
          fontSize: '1.2rem',
        },
        activeChat: {
          display: 'flex',
          alignItems: 'center',
          // Apply alpha transparency to black color
          color: alpha(palette.common.black, 0.3),
          fontSize: '0.7rem',
        },
        selectComponent: {
          fontSize: '0.8rem',
        },
        searchBar: {
          fontSize: '11px',
        },
        listImage: {
          width: 37.5,
          height: 37.5,
        },
        companyText: {
          fontSize: '0.9rem',
        },
        dateTime: {
          fontSize: '0.55rem',
        },
        productText: {
          fontSize: '0.8rem',
        },
        latestMessage: {
          fontSize: '0.7rem',
        },
        progressText: {
          fontSize: '0.7rem',
        },
      };
    }
    if (isLg) {
      return {
        listHeader: {
          pb: spacing(2),
          pt: spacing(2),
          px: spacing(3),
        },
        listTitle: {
          color: palette.common.black,
        },
        activeChat: {
          display: 'flex',
          alignItems: 'center',
          // Apply alpha transparency to black color
          color: alpha(palette.common.black, 0.3),
          fontSize: '1rem',
        },
        listImage: {
          width: 50,
          height: 50,
        },
        companyText: {
          fontSize: typography.h6,
        },
        dateTime: {
          fontSize: typography.body2,
        },
        productText: {
          fontSize: typography.body1,
        },
        latestMessage: {
          fontSize: typography.body1,
        },
        progressText: {
          fontSize: typography.body2,
        },
      };
    }
    return {
      listHeader: {
        pb: spacing(1),
        pt: spacing(2),
        px: spacing(2),
      },
      listTitle: {
        color: palette.common.black,
        fontSize: '1.2rem',
      },
      activeChat: {
        display: 'flex',
        alignItems: 'center',
        // Apply alpha transparency to black color
        color: alpha(palette.common.black, 0.3),
        fontSize: '0.7rem',
      },
      selectComponent: {
        fontSize: '0.8rem',
      },
      searchBar: {
        fontSize: '11px',
      },
      listImage: {
        width: 37.5,
        height: 37.5,
      },
      companyText: {
        fontSize: '0.9rem',
      },
      dateTime: {
        fontSize: '0.55rem',
      },
      productText: {
        fontSize: '0.8rem',
      },
      latestMessage: {
        fontSize: '0.7rem',
      },
      progressText: {
        fontSize: '0.7rem',
      },
    };
  }, [isSm, isMd, isLg]);

  return (
    <Box
      sx={({ palette }) => ({
        backgroundColor: palette.common.white,
        height: '100%',
      })}
    >
      <Box sx={chatListStyles?.listHeader}>
        <Box
          sx={({ spacing }) => ({
            display: 'flex',
            justifyContent: 'space-between',
            mb: 0,
            pl: spacing(1),
          })}
        >
          <Typography variant="h5" sx={chatListStyles?.listTitle}>
            Conversations
          </Typography>
          <Typography variant="subtitle2" sx={chatListStyles?.activeChat}>
            {filteredChats(category, chats).length} ACTIVE{' '}
            {filteredChats(category, chats).length !== 1 ? 'CHATS' : 'CHAT'}
          </Typography>
        </Box>
        <FormControl
          variant="outlined"
          size="small"
          sx={({ spacing }) => ({
            width: 'fit-content',
            background: 'none',
            border: 'none',
            mb: 1,
            pl: spacing(1),
          })}
        >
          <Select
            value={category}
            onChange={handleCategoryChange}
            sx={({ spacing }) => ({
              '& .MuiSelect-select': { p: spacing(0) },
              '& fieldset': {
                border: spacing(0),
              },
              '&::hover': {
                border: spacing(0),
              },
              '&::before': {
                border: spacing(0),
              },
              '&::after': {
                border: spacing(0),
              },
              fontWeight: 500,
              ...chatListStyles?.searchBar,
            })}
          >
            <MenuItem value="all">ALL CHATS</MenuItem>
            <MenuItem value="Buying">BUYING</MenuItem>
            <MenuItem value="Selling">SELLING</MenuItem>
          </Select>
        </FormControl>

        <TextField
          InputProps={{
            disableUnderline: true,
            style: chatListStyles?.searchBar,
          }}
          placeholder="Search messages, listings, usernames"
          variant="filled"
          fullWidth
          sx={({ spacing }) => ({
            '& .MuiFilledInput-root': {
              background: myColor,
              borderRadius: '4px',
              '&:hover': {
                background: myColor,
              },
            },
            '& .MuiInputBase-input': {
              padding: '10px 7px',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '4px',
              '& fieldset': {
                border: spacing(0),
                outline: 'none',
              },
              '&:hover fieldset': {
                border: spacing(0),
                outline: 'none',
              },
            },
          })}
        />
      </Box>
      <List sx={{ overflowY: 'auto', height: 'calc(100% - 100px)' }}>
        {filteredChats(category, chats).map((chat, index) => (
          <Box>
            <ListItem
              key={chat.id}
              onClick={() => {
                setActiveItem(chat.id);
                setSelectChat(chat.id);
              }}
              sx={({ palette }) => ({
                background: activeItem === chat.id ? palette.grey[300] : 'none',
                height: '100%',
              })}
            >
              <ListItemAvatar>
                <Badge overlap="circular" color="error" badgeContent={chat.badgeContent}>
                  <Image
                    style={{ borderRadius: '100%' }}
                    src={chat.imageUrl}
                    width={chatListStyles?.listImage?.width}
                    height={chatListStyles?.listImage?.height}
                    alt="pic"
                  />
                </Badge>
              </ListItemAvatar>
              <ListItemText sx={({ spacing }) => ({ pl: spacing(1) })}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '55%',
                      ...chatListStyles?.companyText,
                    }}
                  >
                    {chat.company}
                  </Typography>
                  <Typography variant="body2" sx={chatListStyles?.dateTime}>
                    {DateTime.fromISO(chat.date).setLocale('en').toFormat('f')}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '95%',
                    ...chatListStyles?.productText,
                  }}
                >
                  {' '}
                  {chat.itemName}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '95%',
                    ...chatListStyles?.latestMessage,
                  }}
                >
                  {chat.latestMessage}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    ...chatListStyles?.progressText,
                  }}
                >
                  {chat.inProgress ? 'In progress' : `Offered price: $${chat.price}`}
                </Typography>
              </ListItemText>
            </ListItem>
            {filteredChats(category, chats).length !== index && (
              <Divider
                sx={({ palette }) => ({
                  borderColor: palette.grey[400],
                  width: '95%',
                  m: 'auto',
                })}
              />
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
};
export default ChatList;
