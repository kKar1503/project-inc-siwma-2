import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
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
  loginId: string;
};

const ChatBox: React.FC<ChatBoxProps> = ({ loginId, roomData }: ChatBoxProps) => (
  <Box sx={{ height: '650px', overflowY: 'auto' }}>
    <Paper elevation={3} sx={{ p: 2 }}>
      <List>
        {roomData.map((message) => (
          <ListItem
            key={message.id}
            sx={{
              display: 'flex',
              flexDirection: message.author === loginId ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
            }}
          >
            <Paper
              variant="outlined"
              sx={({ spacing, palette, shadows }) => ({
                p: spacing(2),
                m: spacing(2),
                backgroundColor:
                  message.author === loginId ? palette.primary[100] : palette.common.white,
                width: '400px',
                boxShadow: shadows[3],
                borderRadius: message.author === loginId ? '12px 12px 0 12px' : '12px 12px 12px 0',
              })}
            >
              {message.content_type === 'image' && (
                <CardMedia component="img" height="250" image={message.content} />
              )}

              {message.content_type === 'text' && (
                <Typography
                  sx={({ palette }) => ({
                    color: message.author === loginId ? palette.common.white : palette.text.primary,
                    fontSize: 'body1',
                    letterSpacing: '0.15px',
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

export default ChatBox;
