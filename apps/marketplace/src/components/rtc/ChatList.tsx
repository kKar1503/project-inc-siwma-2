import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import Image from 'next/image';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme, alpha } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export type ChatListProps = {
  name: string;
};

export type ChatListPageProps = {
  chats: ChatListProps[];
  setSelectChat: (val: string) => void;
};

const ChatList = ({ chats, setSelectChat }: ChatListPageProps) => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, palette, typography } = useTheme();

  // const [category, setCategory] = useState<CategoryType>('All');
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const greyTransparent = alpha(palette.common.black, 0.06);
  const { t } = useTranslation();

  // const handleCategoryChange = (event: SelectChangeEvent) => {
  //   setCategory(event.target.value as CategoryType);
  // };

  // const filteredChats = useMemo(() => {
  //   if (category === 'All') {
  //     return chats;
  //   }
  //   return chats.filter((chat) => chat.category === category);
  // }, [chats, category]);

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
  }, [isSm, isMd, isLg, spacing, palette.common.black, typography.body1, typography.h6, typography.body2]);

  return (
    <Box
      id="chat-list"
      sx={{
        backgroundColor: palette.common.white,
        height: '100%',
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <Box id="list-header" sx={chatListStyles?.listHeader}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 0,
            pl: spacing(1),
          }}
        >
          <Typography variant="h5" sx={chatListStyles?.listTitle}>
            {t('Conversations')}
          </Typography>
          {/* Commented out just in case we want this feature back LOL */}
          {/* <Typography variant="subtitle2" sx={chatListStyles?.activeChat}>
            {filteredChats.length} {t('ACTIVE')}
            {filteredChats.length !== 1 ? t('CHATS') : t('CHAT')}
          </Typography> */}
        </Box>
        <FormControl
          variant="outlined"
          size="small"
          sx={{
            width: 'fit-content',
            background: 'none',
            border: 'none',
            mb: 1,
            pl: spacing(1),
          }}
        >
          {/* <Select
            value={category}
            onChange={handleCategoryChange}
            sx={{
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
            }}
          >
            <MenuItem value="All">{t('ALL CHATS')}</MenuItem>
            <MenuItem value="Buying">{t('BUYING')}</MenuItem>
            <MenuItem value="Selling">{t('SELLING')}</MenuItem>
          </Select> */}
        </FormControl>

        <TextField
          InputProps={{
            disableUnderline: true,
            style: chatListStyles?.searchBar,
          }}
          placeholder={t('Search messages, listings, usernames').toString()}
          variant="filled"
          fullWidth
          sx={{
            '& .MuiFilledInput-root': {
              borderRadius: '4px',
              '&:hover': {
                background: grey,
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
          }}
        />
      </Box>
      <List sx={{ overflowY: 'auto', height: 'calc(100% - 105px)' }}>
        {chats.map((chat, index) => (
          <Box>
            <ListItem
              key={chat.name}
              onClick={() => {
                setActiveItem(chat.name);
                setSelectChat(chat.name);
              }}
              sx={{
                cursor: 'pointer',
                background: activeItem === chat.name ? palette.grey[300] : 'none',
                height: '100%',
                '&:hover': {
                  background: greyTransparent,
                },
              }}
            >
              <ListItemAvatar>
                <Badge overlap="circular" color="error" badgeContent="">
                  <Image
                    style={{ borderRadius: '100%' }}
                    src="/images/placeholder.png"
                    width={chatListStyles?.listImage?.width}
                    height={chatListStyles?.listImage?.height}
                    alt="pic"
                  />
                </Badge>
              </ListItemAvatar>
              <ListItemText sx={{ pl: spacing(1) }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '55%',
                      userSelect: 'none',
                      ...chatListStyles?.companyText,
                    }}
                  >
                    {chat.name}
                  </Typography>
                  {/* <Typography
                    variant="body2"
                    sx={{
                      userSelect: 'none',
                      ...chatListStyles?.dateTime,
                    }}
                  >
                    {chat.time ? DateTime.fromJSDate(chat.time).setLocale('en').toFormat('f') : ''}
                  </Typography> */}
                </Box>
                {/* <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '95%',
                    userSelect: 'none',
                    ...chatListStyles?.productText,
                  }}
                >
                  {' '}
                  {chat.itemName}
                </Typography> */}
                {/* <Typography
                  variant="body1"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '95%',
                    userSelect: 'none',
                    ...chatListStyles?.latestMessage,
                  }}
                >
                  {chat.contentType === 'offer' ? (
                    <>
                      <Typography
                        component="span"
                        sx={{
                          userSelect: 'none',
                        }}
                      >
                        {t('Offer: ')}
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          userSelect: 'none',
                        }}
                      >{`$${chat.latestMessage.amount} `}</Typography>
                      {chat.latestMessage.accepted ? (
                        <Typography
                          component="span"
                          sx={{
                            userSelect: 'none',
                          }}
                        >
                          {t('(Accepted)')}
                        </Typography>
                      ) : (
                        <Typography
                          component="span"
                          sx={{
                            userSelect: 'none',
                          }}
                        >
                          {t(chat.latestMessage.content)}
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Typography
                      component="span"
                      sx={{
                        userSelect: 'none',
                      }}
                    >
                      {chat.latestMessage}
                    </Typography>
                  )}
                </Typography> */}
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    textAlign: 'right',
                    mt: spacing(1),
                    userSelect: 'none',
                    ...chatListStyles?.progressText,
                  }}
                >
                  {/* {chat.inProgress ? t('In progress') : ''} */}
                </Typography>
              </ListItemText>
            </ListItem>
            {chats.length !== index && (
              <Divider
                sx={{
                  borderColor: palette.grey[400],
                  width: '95%',
                  m: 'auto',
                }}
              />
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ChatList;
