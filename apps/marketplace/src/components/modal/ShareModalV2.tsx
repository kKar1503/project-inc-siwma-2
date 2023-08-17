import { useState, useMemo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Done from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Tooltip from '@mui/material/Tooltip';
import { useResponsiveness } from '@inc/ui';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

export type ShareModalV2Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  link?: string;
};

const ShareModalV2 = ({ open, setOpen, link = '' }: ShareModalV2Props) => {
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
          width: '30%',
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
        onClose={() => setOpen(false)}
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
                <Box sx={({ spacing }) => ({ pb: spacing(1) })}>
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
                        Share
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Avatar
                          sx={({ palette }) => ({
                            bgcolor: palette.grey[100],
                          })}
                        >
                          <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon sx={{ color: 'black' }} />
                          </IconButton>
                        </Avatar>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

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
                      <IconButton
                        size="large"
                        onClick={() => {
                          const uri = encodeURI(
                            `https://wa.me/?text=Check out these listings from the SIWMA marketplace!\n${link}`
                          );
                          window.open(uri, '_blank', 'noreferrer');
                        }}
                      >
                        <WhatsAppIcon
                          sx={({ palette }) => ({
                            color: palette.secondary.main,
                            fontSize: 'inherit',
                          })}
                        />
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
                            }, 3000);
                          }}
                          disabled={copyClicked}
                          size="large"
                        >
                          {copyClicked ? (
                            <Done
                              sx={({ palette }) => ({
                                color: palette.success[300],
                                fontSize: 'inherit',
                              })}
                            />
                          ) : (
                            <ContentCopy sx={{ color: 'grey', fontSize: 'inherit' }} />
                          )}
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
