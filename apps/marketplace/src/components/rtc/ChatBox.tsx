import React, { useRef } from 'react';
import type { TContentType } from '@inc/db';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

type ChatData = {
  id: number;
  contentType: TContentType;
  read: boolean;
  content?: string;
  offer: number | null;
  author: string;
  createdAt: Date;
};

export type ChatBoxProps = {
  roomData: ChatData[];
  loginId: string;
  ChatText: JSX.Element;
};

const ChatBox = ({ loginId, roomData, ChatText }: ChatBoxProps) => {
  const { t } = useTranslation();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, shape, shadows, palette, typography } = useTheme();

  const filterFileType = (fileURL: string) => {
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
  };

  const handleDownload = (url: string) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = ''; // Specify a custom file name if desired
    anchor.click();
  };

  return (
    <Box>
      <Box sx={{}}>
        <Paper
          sx={{
            p: 2,
            height: 'calc(100vh - 280px)',
            overflow: 'auto',
          }}
        >
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
                    p: spacing(1),
                    backgroundColor:
                      message.author === loginId ? palette.primary[100] : palette.common.white,
                    maxWidth: '400px',
                    boxShadow: shadows[3],
                    borderRadius:
                      message.author === loginId ? '12px 12px 0 12px' : '12px 12px 12px 0',
                  })}
                >
                  {message.contentType === 'image' && (
                    <CardMedia component="img" height="250" image={message.content} />
                  )}

                  {message.contentType === 'text' && (
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
                  {message.contentType === 'offer' && (
                    <Box>
                      <Typography
                        sx={({ palette }) => ({
                          color:
                            message.author === loginId
                              ? palette.common.white
                              : palette.text.primary,
                          fontSize: 'subtitle1',
                          fontWeight: 'bold',
                          letterSpacing: '0.15px',
                        })}
                      >
                        {t('Make Offer')}
                      </Typography>
                      <Typography
                        sx={({ palette }) => ({
                          color:
                            message.author === loginId
                              ? palette.common.white
                              : palette.text.primary,
                          fontSize: 'body1',
                          letterSpacing: '0.15px',
                        })}
                      >
                        {message.offer?.toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                  {message.contentType === 'file' && message.content !== undefined && (
                    <Box display="flex">
                      <DescriptionOutlinedIcon
                        fontSize="large"
                        sx={({ palette }) => ({
                          color:
                            message.author === loginId
                              ? palette.common.white
                              : palette.text.primary,
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
                          {t(filterFileType(message.content))}
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
      <Box
        sx={({ spacing }) => ({
          position: 'sticky',
          bottom: spacing(0),
          // height: '0vh',
        })}
      >
        {/* The ChatTextBox component  */}
        {ChatText}
      </Box>
    </Box>
  );
};

export default ChatBox;
