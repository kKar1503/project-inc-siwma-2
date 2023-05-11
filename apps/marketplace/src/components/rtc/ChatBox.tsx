import { Box, List, ListItem, Paper, Typography, CardMedia } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React from 'react';

type ChatData = {
  id: string;
  content: string;
  content_type: string;
  isMine: boolean;
};

export type ChatBoxProps = {
  roomData: ChatData[];
};

const ChatBox: React.FC<ChatBoxProps> = ({ roomData }: ChatBoxProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#60A5FA',
      },
    },
  });
  return (
    <Box sx={({ spacing }) => ({ height: '650px',overflowY: 'auto' })}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {roomData.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                display: 'flex',
                flexDirection: message.isMine ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
              }}
            >
              <Paper
                variant="outlined"
                sx={({ spacing, palette, shadows }) => ({
                  p: spacing(2),
                  m: spacing(2),
                  backgroundColor: message.isMine
                    ? theme.palette.primary.main
                    : palette.common.white,
                  width: '400px',
                  boxShadow: shadows[3],
                  borderRadius: message.isMine ? '12px 12px 0 12px' : '12px 12px 12px 0',
                })}
              >
                {message.content_type === 'image' && (
                  <CardMedia component="img" height="250" image={message.content} />
                )}

                {message.content_type === 'message' && (
                  <Typography
                    sx={({ palette, typography }) => ({
                      color: message.isMine ? palette.common.white : palette.text.primary,
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
