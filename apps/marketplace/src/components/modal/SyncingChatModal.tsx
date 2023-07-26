import { ReactNode, useMemo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import MUIModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { useResponsiveness } from '@inc/ui';
import { useTheme } from '@mui/material/styles';
import { LinearProgress } from '@mui/material';

export type ComponentProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  progress: number;
  rightButtonState: boolean;
  setRightButtonState: (val: boolean) => void;
};

const SyncingChatModal = ({
  open,
  setOpen,
  progress,
  rightButtonState,
  setRightButtonState,
}: ComponentProps) => {
  const handleClose = () => setOpen(false);

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, palette, typography, shadows } = useTheme();

  const modalStyles = useMemo(() => {
    if (isSm) {
      return {
        modalWidth: {
          width: '80%',
        },
        buttonTxt: {
          fontSize: '0.85rem',
          // fontWeight: '400',
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
    <div>
      <MUIModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            onClick: () => null,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: 3,
              padding: spacing(2),
              position: 'absolute',
              boxShadow: shadows[3],
              backgroundColor: palette.common.white,
              ...modalStyles?.modalWidth,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <InfoOutlined
                color="info"
                sx={({ spacing }) => ({ fontSize: { xs: 32, md: 48 }, mr: spacing(2) })}
              />
              <Box sx={{ justifyContent: 'left' }}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    color: palette.info[800],
                  }}
                >
                  Syncing Chat Messages
                </Typography>
                <Box textAlign="center">
                  <Typography
                    id="transition-modal-description"
                    sx={{
                      mt: 2,
                      fontSize: { xs: 'subtitle1', sm: 'h6' },
                      textAlign: 'left',
                    }}
                  >
                    Please do not close or refresh this tab during the message syncing process.
                  </Typography>
                </Box>
                <Box sx={{ width: '90%', mt: '32px', mb: '16px' }}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
              </Box>
            </Box>
            <Box textAlign="center" display="flex" justifyContent="center">
              {/* Right Button Text */}
              <Button
                variant="contained"
                disabled={progress !== 100}
                sx={{
                  bgcolor: '#2962FF',
                  width: 1 / 3,
                  marginTop: spacing(2),
                }}
                onClick={() => setRightButtonState(true)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: palette.common.white,
                    ...modalStyles?.buttonTxt,
                  }}
                >
                  CLOSE
                </Typography>
              </Button>
            </Box>
          </Box>
        </Fade>
      </MUIModal>
    </div>
  );
};

export default SyncingChatModal;
