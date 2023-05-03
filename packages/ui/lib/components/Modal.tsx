import { Dispatch, SetStateAction, ReactNode } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box, { BoxProps } from '@mui/material/Box';
import MUIModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';

const ModalBoxShadow = styled(Box)<BoxProps>(({ theme }) =>
  theme.unstable_sx({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '23%',
    borderRadius: 3,
    padding: 2,
    position: 'absolute',
    boxShadow: 24,
    backgroundColor: 'background.paper',
  })
);

// declaring props for TransitionsModal
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
  const isXsScreen = useMediaQuery('(max-width:600px)');

  // set the border color based on the modal type
  let iconType: ReactNode;
  // select icon based on the modal type (success/info/warning)
  switch (icon) {
    case 'success':
      // green
      iconType = (
        <CheckCircleOutlineOutlined color="success" sx={{ fontSize: { xs: 32, md: 48 }, mr: 2 }} />
      );
      break;
    case 'warning':
      // orange/red
      iconType = (
        <WarningAmberOutlined color="warning" sx={{ fontSize: { xs: 24, md: 32 }, mr: 2 }} />
      );
      break;
    case 'info':
    default:
      // by default will set to info
      iconType = <InfoOutlined color="info" sx={{ fontSize: { xs: 32, md: 42 }, mr: 2 }} />;
  }
  // the styling of the modal box

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
          <ModalBoxShadow>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {iconType}
              <Box sx={{ justifyContent: 'left' }}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    color: '#013654',
                    fontSize: { xs: 'subtitle1', sm: 'h5' },
                  }}
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
                  sx={{
                    bgcolor: leftButtonText != null ? '' : buttonColor,
                    marginRight: '16px',
                    width: 1 / 2,
                    marginTop: 2,
                    padding: '7px 20px',
                    '@media (max-width: 600px)': {
                      padding: '2px 4px',
                    },
                  }}
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
                sx={{
                  bgcolor: buttonColor,
                  width: 1 / 2,
                  marginTop: 2,
                  padding: '7px 20px',
                  '@media (max-width: 600px)': {
                    padding: '4px 8px',
                  },
                }}
                onClick={() => setRightButtonState(true)}
              >
                <Typography sx={{ fontSize: { xs: 'overline', sm: 'subtitle1' } }}>
                  {rightButtonText}
                </Typography>
              </Button>
            </Box>
          </ModalBoxShadow>
        </Fade>
      </MUIModal>
    </div>
  );
};

export default Modal;
