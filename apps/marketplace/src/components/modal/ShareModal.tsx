import { useState, useMemo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import { useResponsiveness } from '@inc/ui';

export type ShareModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  title: string;
  content: string;
  link?: string;
};

const ShareModal = ({ open, setOpen, title, content, link = '' }: ShareModalProps) => {
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
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={({ palette }) => ({
                    color: palette.info[800],
                    fontSize: { xs: 'subtitle2', sm: 'h5' },
                  })}
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
                <OutlinedInput
                  fullWidth
                  sx={{
                    backgroundColor: 'transparent',
                    borderRadius: 2,
                    mt: 1,
                  }}
                  readOnly
                  value={link}
                  endAdornment={
                    <InputAdornment sx={{ m: 0 }} position="end">
                      <Tooltip
                        title={copyClicked ? 'Copied!' : 'Copy to Clipboard'}
                        placement="top"
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
                          <ContentCopy />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  }
                />
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ShareModal;
