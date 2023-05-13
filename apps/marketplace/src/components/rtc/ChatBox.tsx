import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import { createTheme } from '@mui/material/styles';
import React from 'react';
import type { TContentType } from '@inc/db';

type ChatData = {
  id: string;
  content: string;
  content_type: TContentType;
  author: string;
};

export type ChatBoxProps = {
  roomData: ChatData[];
};

const ChatBox: React.FC<ChatBoxProps> = ({ roomData }: ChatBoxProps) => {
  // need to use next auth to get user id 
  const id = 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af';

  const theme = createTheme({
    palette: {
      primary: {
        main: '#60A5FA',
      },
    },
  });
  return (
    <Box sx={{ height: '650px', overflowY: 'auto' }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {roomData.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                display: 'flex',
                flexDirection: message.author === id ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
              }}
            >
              <Paper
                variant="outlined"
                sx={({ spacing, palette, shadows }) => ({
                  p: spacing(2),
                  m: spacing(2),
                  backgroundColor:
                    message.author === id ? theme.palette.primary.main : palette.common.white,
                  width: '400px',
                  boxShadow: shadows[3],
                  borderRadius: message.author === id ? '12px 12px 0 12px' : '12px 12px 12px 0',
                })}
              >
                {message.content_type === 'image' && (
                  <CardMedia component="img" height="250" image={message.content} />
                )}

                {message.content_type === 'text' && (
                  <Typography
                    sx={({ palette }) => ({
                      color: message.author === id ? palette.common.white : palette.text.primary,
                      fontSize: 'h5',
                      letterSpacing: '-0.5px',
                      fontStyle: 'Roboto',
                    })}
                  >
                    {message.content}
                  </Typography>
                )}
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ChatBox;
