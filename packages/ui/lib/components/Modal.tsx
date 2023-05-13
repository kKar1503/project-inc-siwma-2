import { Dispatch, SetStateAction, ReactNode } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import MUIModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';



type ComponentProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  buttonColor: `#${string}`;
  icon: 'success' | 'info' | 'warning';
  title: string;
  content: string;
  leftButtonText?: string | null;
  rightButtonText: string;
  leftButtonState?: boolean;
  rightButtonState: boolean;
  setLeftButtonState: Dispatch<SetStateAction<boolean>>;
  setRightButtonState: Dispatch<SetStateAction<boolean>>;
};

/**
 * Modal
 *  Data is expected to contain at least one button, if there is only one button we will leave leftbuttonText,
 *  leftButtonState and setLeftButtonState, then data should look like this:
 * {
      open={open}
      setOpen={setOpen}
      buttonColor="#0288D1"
      icon="info"
      title="Seller has been reported"
      content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
      leftButtonText={null} // <= only one button set as null
      rightButtonText="return to home page"
      leftButtonState={false} // <= only one button, set as false
      rightButtonState={rightButtonState}
      setLeftButtonState={setRightButtonState} // <= only one button, set as the rightButtonState
      setRightButtonState={setRightButtonState}
    }
 */

const Modal = ({
  open,
  setOpen,
  buttonColor,
  icon,
  title,
  content,
  leftButtonText,
  rightButtonText,
  leftButtonState,
  rightButtonState,
  setLeftButtonState,
  setRightButtonState,
}: ComponentProps) => {
  const handleClose = () => setOpen(false);

  let iconType: ReactNode;
  switch (icon) {
    case 'success':
      iconType = (
        <CheckCircleOutlineOutlined
          color="success"
          sx={({ spacing }) => ({ fontSize: { xs: 32, md: 48 }, mr: spacing(2) })}
        />
      );
      break;
    case 'warning':
      iconType = (
        <WarningAmberOutlined
          color="warning"
          sx={({ spacing }) => ({ fontSize: { xs: 32, md: 48 }, mr: spacing(2) })}
        />
      );
      break;
    case 'info':
    default:
      iconType = (
        <InfoOutlined
          color="info"
          sx={({ spacing }) => ({ fontSize: { xs: 32, md: 48 }, mr: spacing(2) })}
        />
      );
  }
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
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={({ spacing, palette, shadows }) => ({
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '25%',
              borderRadius: 3,
              padding: spacing(2),
              position: 'absolute',
              boxShadow: shadows[3],
              backgroundColor: palette.common.white,
            })}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {iconType}
              <Box sx={{ justifyContent: 'left' }}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={({  palette }) => ({
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
                      mt: 2,
                      fontSize: { xs: 'subtitle1', sm: 'h6' },
                      textAlign: 'left',
                    }}
                  >
                    {content}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box textAlign="center" display="flex" justifyContent="center">
              {/* if Left Button Text is != null, it will print */}
              {leftButtonText != null && (
                <Button
                  variant={leftButtonText != null ? 'outlined' : 'contained'}
                  sx={({ spacing }) => ({
                    bgcolor: leftButtonText != null ? '' : buttonColor,
                    marginRight: '16px',
                    width: 1 / 2,
                    marginTop: spacing(2),
                    padding: '7px 20px',
                    '@media (max-width: 600px)': {
                      padding: '2px 4px',
                    },
                  })}
                  onClick={() => setLeftButtonState(true)}
                >
                  <Typography sx={{ fontSize: { xs: 'overline', sm: 'subtitle1' } }}>
                    {leftButtonText}
                  </Typography>
                </Button>
              )}

              {/* Right Button Text */}
              <Button
                variant="contained"
                sx={({ spacing }) => ({
                  bgcolor: buttonColor,
                  width: 1 / 2,
                  marginTop: spacing(2),
                  padding: '7px 20px',
                  '@media (max-width: 600px)': {
                    padding: '4px 8px',
                  },
                })}
                onClick={() => setRightButtonState(true)}
              >
                <Typography
                  sx={({ palette }) => ({
                    fontSize: { xs: 'overline', sm: 'subtitle1' },
                    color: palette.common.white,
                  })}
                >
                  {rightButtonText}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Fade>
      </MUIModal>
    </div>
  );
};

export default Modal;
