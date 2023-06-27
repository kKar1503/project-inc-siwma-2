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
  offerState?: 'pending' | 'accepted' | 'rejected';
};

export type ChatBoxProps = {
  roomData: ChatData[];
  loginId: string;
  ChatText: JSX.Element;
  acceptOffer: string;
  setAcceptOffer: React.Dispatch<React.SetStateAction<'pending' | 'accepted' | 'rejected'>>;
  setDeleteOffer: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatBox = ({
  loginId,
  roomData,
  ChatText,
  acceptOffer,
  setAcceptOffer,
  setDeleteOffer,
}: ChatBoxProps) => {
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
      <Box>
        <Paper
          sx={{
            p: 2,
            height: isSm ? 'calc(100vh - 200px)' : 'calc(100vh - 350px)',
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
                  {message.offerState === 'pending' && (
                    <Box>
                      <Box display="flex" sx={({ spacing }) => ({ mb: spacing(2) })}>
                        <Typography
                          sx={({ palette, spacing }) => ({
                            color:
                              message.author === loginId
                                ? palette.common.white
                                : palette.text.primary,
                            fontSize: 'subtitle1',
                            fontWeight: 'bold',
                            letterSpacing: '0.15px',
                            mr: spacing(3),
                          })}
                        >
                          {t('Make Offer')} :
                        </Typography>
                        <Typography
                          sx={({ palette, spacing }) => ({
                            color:
                              message.author === loginId
                                ? palette.common.white
                                : palette.text.primary,
                            fontSize: 'subtitle1',
                            fontWeight: 'bold',
                            letterSpacing: '0.15px',
                            mr: spacing(3),
                          })}
                        >
                          ${message.offer}
                        </Typography>
                      </Box>
                      {/* if the offer belongs to the logged in user, he can cancel the offer, else the buyer will get to choose "Decline"/"Accept" it */}
                      {message.author === loginId ? (
                        <Box>
                          <Button
                            variant="contained"
                            sx={({ palette }) => ({
                              color: palette.common.white,
                              fontSize: 'body1',
                              letterSpacing: '0.15px',
                              backgroundColor: palette.error[300],
                              width: '100%',
                            })}
                            onClick={() => setDeleteOffer(true)}
                          >
                            {t('cancel')}
                          </Button>
                        </Box>
                      ) : (
                        <Box>
                          <Box>
                            <Button
                              variant="outlined"
                              sx={({ palette, spacing }) => ({
                                color:
                                  message.author === loginId
                                    ? palette.common.white
                                    : palette.error.main,
                                fontSize: 'body1',
                                letterSpacing: '0.15px',
                                mr: spacing(2),
                                borderColor: palette.error[300],
                              })}
                              onClick={() => setAcceptOffer('rejected')}
                            >
                              {t('Decline')}
                            </Button>
                            <Button
                              variant="contained"
                              sx={({ palette }) => ({
                                color:
                                  message.author === loginId
                                    ? palette.common.white
                                    : palette.common.white,
                                fontSize: 'body1',
                                letterSpacing: '0.15px',
                                backgroundColor: palette.primary.main,
                              })}
                              onClick={() => setAcceptOffer('accepted')}
                            >
                              {t('Accept')}
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}
                  {message.offerState === 'accepted' && (
                    <Box>
                      <Box display="flex" sx={({ spacing }) => ({ mb: spacing(2) })}>
                        <Typography
                          sx={({ palette, spacing }) => ({
                            color:
                              message.author === loginId
                                ? palette.common.white
                                : palette.text.primary,
                            fontSize: 'subtitle1',
                            fontWeight: 'bold',
                            letterSpacing: '0.15px',
                            mr: spacing(3),
                          })}
                        >
                          {t('Make Offer')} :
                        </Typography>
                        <Typography
                          sx={({ palette, spacing }) => ({
                            color:
                              message.author === loginId
                                ? palette.common.white
                                : palette.text.primary,
                            fontSize: 'subtitle1',
                            fontWeight: 'bold',
                            letterSpacing: '0.15px',
                            mr: spacing(3),
                          })}
                        >
                          ${message.offer}
                        </Typography>
                      </Box>
                      <Typography
                        sx={({ palette }) => ({
                          color: palette.success[400],
                          fontSize: 'subtitle1',
                          fontWeight: 'bold',
                          letterSpacing: '0.15px',
                          textAlign: 'center',
                        })}
                      >
                        {t('Offer Accepted')}
                      </Typography>
                    </Box>
                  )}
                  {message.offerState === 'rejected' && (
                    <Box>
                      <Box display="flex" sx={({ spacing }) => ({ mb: spacing(2) })}>
                        <Typography
                          sx={({ palette, spacing }) => ({
                            color:
                              message.author === loginId
                                ? palette.common.white
                                : palette.text.primary,
                            fontSize: 'subtitle1',
                            fontWeight: 'bold',
                            letterSpacing: '0.15px',
                            mr: spacing(3),
                          })}
                        >
                          {t('Make Offer')} :
                        </Typography>
                        <Typography
                          sx={({ palette, spacing }) => ({
                            color:
                              message.author === loginId
                                ? palette.common.white
                                : palette.text.primary,
                            fontSize: 'subtitle1',
                            fontWeight: 'bold',
                            letterSpacing: '0.15px',
                            mr: spacing(3),
                          })}
                        >
                          ${message.offer}
                        </Typography>
                      </Box>
                      <Typography
                        sx={({ palette }) => ({
                          color: palette.error[400],
                          fontSize: 'subtitle1',
                          fontWeight: 'bold',
                          letterSpacing: '0.15px',
                          textAlign: 'center',
                        })}
                      >
                        {t('Offer Declined')}
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
