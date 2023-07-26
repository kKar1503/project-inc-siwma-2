import { useState, useMemo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import ContentCopy from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Tooltip from '@mui/material/Tooltip';
import { useResponsiveness } from '@inc/ui';
import { Avatar, Grid } from '@mui/material';

export type ShareModalV2Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  title: string;
  content: string;
  link?: string;
};

const ShareModalV2 = ({ open, setOpen, title, content, link = '' }: ShareModalV2Props) => {
  const [copyClicked, setCopyClicked] = useState(false);
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const modalStyles = useMemo(() => {
    if (isSm) {
      return {
        modalWidth: {
          width: '80%',
        },
        buttonTxt: {
          fontSize: '0.9rem',
        },
      };
    }
    if (isMd) {
      return {
        modalWidth: {
          width: '45%',
        },
        buttonTxt: {
          fontSize: '1rem',
        },
      };
    }
    if (isLg) {
      return {
        modalWidth: {
          width: '35%',
        },
        buttonTxt: {
          fontSize: '1rem',
        },
      };
    }
    return {
      modalWidth: {
        width: '50%',
      },
      buttonTxt: {
        fontSize: '1rem',
      },
    };
  }, [isSm, isMd, isLg]);

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={setOpen}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={({ spacing, palette, shadows }) => ({
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: 3,
              padding: spacing(2),
              position: 'absolute',
              boxShadow: shadows[3],
              backgroundColor: palette.common.white,
              ...modalStyles?.modalWidth,
            })}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: 1 }}>
                <Grid container sx={{ flexGrow: 1 }}>
                  <Grid item xs={6}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{
                        fontSize: '24px',
                      }}
                    >
                      {title}
                    </Typography>
                    <Box textAlign="center">
                      <Typography
                        id="transition-modal-description"
                        sx={{
                          fontSize: { xs: 'subtitle1', sm: 'h6' },
                          textAlign: 'left',
                        }}
                      >
                        {content}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Avatar
                        sx={({ palette }) => ({
                          bgcolor: palette.grey[100],
                        })}
                      >
                        <IconButton>
                          <CloseIcon sx={{ color: 'black' }} />
                        </IconButton>
                      </Avatar>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <OutlinedInput
                    fullWidth
                    sx={{
                      backgroundColor: 'transparent',
                      borderRadius: 2,
                      mt: 1,
                    }}
                    readOnly
                    value={link}
                  />
                </Box>
                <Box
                  sx={({ spacing }) => ({
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: spacing(2),
                  })}
                >
                  <Box>
                    <Avatar
                      sx={({ palette }) => ({
                        bgcolor: palette.grey[100],
                      })}
                    >
                      <IconButton>
                        <WhatsAppIcon color="secondary" />
                      </IconButton>
                    </Avatar>
                  </Box>
                  <Box
                    sx={({ spacing }) => ({
                      pl: spacing(2),
                    })}
                  >
                    <Tooltip title={copyClicked ? 'Copied!' : 'Copy to Clipboard'} placement="top">
                      <Avatar
                        sx={({ palette }) => ({
                          bgcolor: palette.grey[100],
                        })}
                      >
                        <IconButton
                          onClick={() => {
                            navigator.clipboard.writeText(link);
                            setCopyClicked(true);
                            setTimeout(() => {
                              setCopyClicked(false);
                            }, 5000);
                          }}
                        >
                          <ContentCopy sx={{ color: 'grey' }} />
                        </IconButton>
                      </Avatar>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ShareModalV2;
