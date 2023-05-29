import React , { useRef } from 'react';
import type { TContentType } from '@inc/db';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

type ChatData = {
  id: string;
  content_type: TContentType;
  read: boolean;
  content?: string;
  offer?: number;
  author: string;
  createdAt: string;
};

export type ChatBoxProps = {
  roomData: ChatData[];
  loginId: string;
};

const ChatBox: React.FC<ChatBoxProps> = ({ loginId, roomData }: ChatBoxProps) => {
   const filterFileType = (fileURL : string) => {
    const extension = fileURL.split('.').pop()?.toLowerCase() || '';

      if (!extension) {
        // Handle the case when the extension is not found
        return 'Empty string';
      }
      // Get file type from URL
      let fileType: string;
      switch (extension) {
        case 'pdf':
          fileType = 'PDF File';
          break;
        case 'docx':
        case 'doc':
          fileType = 'Document File';
          break;
        case 'xlsx':
        case 'xls':
          fileType = 'Excel File';
          break;
        case 'txt':
          fileType = 'Text File';
          break;
        case 'csv':
          fileType = 'CSV File';
          break;
        case 'zip':
          fileType = 'Zip File';
          break;
        default:
          return 'File';
      }
      return fileType;
   }    
   
     const downloadFile = (url: string) => {
       const anchor = document.createElement('a');
       anchor.href = url;
       anchor.download = ''; // Specify a custom file name if desired
       anchor.click();
     };

     const handleDownload = (url: string) => {
       downloadFile(url);
     };

  return (
    <Box sx={{ overflowY: 'auto', height: '70vh' }}>
      <Paper sx={{ p: 2 }}>
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
                  maxWidth: '400px',
                  boxShadow: shadows[3],
                  borderRadius:
                    message.author === loginId ? '12px 12px 0 12px' : '12px 12px 12px 0',
                })}
              >
                {message.content_type === 'image' && (
                  <CardMedia component="img" height="250" image={message.content} />
                )}

                {message.content_type === 'text' && (
                  <Typography
                    sx={({ palette }) => ({
                      color:
                        message.author === loginId ? palette.common.white : palette.text.primary,
                      fontSize: 'body1',
                      letterSpacing: '0.15px',
                    })}
                  >
                    {message.content}
                  </Typography>
                )}
                {message.content_type === 'offer' && (
                  <Box>
                    <Typography
                      sx={({ palette }) => ({
                        color:
                          message.author === loginId ? palette.common.white : palette.text.primary,
                        fontSize: 'subtitle1',
                        fontWeight: 'bold',
                        letterSpacing: '0.15px',
                      })}
                    >
                      Make Offer
                    </Typography>
                    <Typography
                      sx={({ palette }) => ({
                        color:
                          message.author === loginId ? palette.common.white : palette.text.primary,
                        fontSize: 'body1',
                        letterSpacing: '0.15px',
                      })}
                    >
                      {message.offer?.toFixed(2)}
                    </Typography>
                  </Box>
                )}
                {message.content_type === 'file' && message.content !== undefined && (
                  <Box display="flex">
                    <DescriptionOutlinedIcon
                      fontSize="large"
                      sx={({ palette }) => ({
                        color:
                          message.author === loginId ? palette.common.white : palette.text.primary,
                      })}
                    />
                    <Box>
                      <Button
                        sx={({ palette }) => ({
                          color:
                            message.author === loginId
                              ? palette.common.white
                              : palette.text.primary,
                          fontSize: 'body1',
                          letterSpacing: '0.15px',
                        })}
                        onClick={() => handleDownload(message.content || '')}
                      >
                        {filterFileType(message.content)}
                      </Button>
                    </Box>
                  </Box>
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
