import { useState, Dispatch, SetStateAction, ReactNode } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  CheckCircleOutlineOutlined,
  InfoOutlined,
  WarningAmberOutlined,
} from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';

type ComponentProps = {
  modalButtonName: string;
  modalButtonStyle: object;
  modalType: string;
  title: string;
  content: string;
  leftButtonText: string;
  rightButtonText: string | null;
  leftButtonState: boolean;
  rightButtonState: boolean;
  setLeftButtonState: Dispatch<SetStateAction<boolean>>;
  setRightButtonState: Dispatch<SetStateAction<boolean>>;
};

const TransitionsModal = ({
  modalButtonName,
  modalButtonStyle,
  modalType,
  title,
  content,
  leftButtonText,
  rightButtonText,
  leftButtonState,
  rightButtonState,
  setLeftButtonState,
  setRightButtonState,
}: ComponentProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isXsScreen = useMediaQuery('(max-width:600px)');

  // set the border color based on the modal type
  let borderColor: string;
  let iconType: ReactNode;
  switch (modalType) {
    case 'success':
      borderColor = '#2E7D32';
      iconType = (
        <CheckCircleOutlineOutlined color="success" sx={{ fontSize: { xs: 24, md: 32 } }} />
      );
      break;
    case 'info':
      borderColor = '#0288D1';
      iconType = <InfoOutlined color="info" sx={{ fontSize: { xs: 24, md: 32 } }} />;
      break;
    case 'warning':
      borderColor = '#EDBF02';
      iconType = <WarningAmberOutlined color="warning" sx={{ fontSize: { xs: 24, md: 32 } }} />;
      break;
    default:
      borderColor = '#2E7D32';
      iconType = (
        <CheckCircleOutlineOutlined color="success" sx={{ fontSize: { xs: 24, md: 32 } }} />
      );
  }
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    border: '1px solid',
    borderColor,
    p: 4,
  };

  // if ((leftButtonState || rightButtonState) !== false) {
  //   console.log(leftButtonState);
  //   console.log(rightButtonState);
  // }
  return (
    <div>
      <Button onClick={handleOpen} sx={modalButtonStyle}>{modalButtonName}</Button>
      <Modal
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
          <Box sx={style}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {iconType}
              <Box>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    color: '#013654',
                    ml: 2,
                    fontSize: { xs: 'subtitle2', sm: 'h6' },
                  }}
                >
                  {title}
                </Typography>
                <Box textAlign="center">
                  <Typography
                    id="transition-modal-description"
                    sx={{
                      mt: 2,
                      fontSize: { xs: 'overline', sm: 'subtitle1' },
                      textAlign: isXsScreen ? 'left' : 'center',
                    }}
                  >
                    {content}
                  </Typography>
                </Box>
                <Box textAlign="center" display="flex">
                  {/* Left Button Text */}
                  <Button
                    variant={rightButtonText != null ? 'outlined' : 'contained'}
                    sx={{
                      bgcolor: rightButtonText != null ? '' : borderColor,
                      marginRight: '16px',
                      marginTop: 2,
                      padding: '7px 20px',
                      '@media (max-width: 600px)': {
                        padding: '4px 8px',
                      },
                    }}
                    onClick={() => setLeftButtonState(true)}
                  >
                    <Typography sx={{ fontSize: { xs: 'overline', sm: 'subtitle1' } }}>
                      {rightButtonText}
                    </Typography>
                  </Button>
                  {/* Right Button Text */}
                  {rightButtonText != null && (
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: borderColor,
                        marginTop: 2,
                        padding: '7px 20px',
                        '@media (max-width: 600px)': {
                          padding: '4px 8px',
                        },
                      }}
                      onClick={() => setRightButtonState(true)}
                    >
                      <Typography sx={{ fontSize: { xs: 'overline', sm: 'subtitle1' } }}>
                        {leftButtonText}
                      </Typography>
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
