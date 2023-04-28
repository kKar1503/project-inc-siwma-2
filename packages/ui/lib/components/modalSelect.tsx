// import { useState, Dispatch, SetStateAction, ReactNode } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from'@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment';
import {
  CheckCircleOutlineOutlined,
  InfoOutlined,
  WarningAmberOutlined,
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

// declaring props for TransitionsModal
type ComponentProps = {
  modalButtonName: string;
  modalButtonStyle: object;
  modalType: string;
  title: string;
  content: string;
  leftButtonText: string;
  rightButtonText: string;
  selectInput: string;
  setselectInput: React.Dispatch<React.SetStateAction<string>>;
  leftButtonState: boolean;
  rightButtonState: boolean;
  setLeftButtonState: React.Dispatch<React.SetStateAction<boolean>>;
  setRightButtonState: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalSelect = ({
  modalButtonName,
  modalButtonStyle,
  modalType,
  title,
  content,
  leftButtonText,
  rightButtonText,
  selectInput,
  setselectInput,
  leftButtonState,
  rightButtonState,
  setLeftButtonState,
  setRightButtonState,
}: ComponentProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isXsScreen = useMediaQuery('(max-width:600px)');

  // set the border color based on the modal type
  let borderColor: string;
  let iconType: React.ReactNode;
  // select icon based on the modal type (success/info/warning)
  switch (modalType) {
    case 'success':
      // success icon + green
      borderColor = '#2E7D32';
      iconType = (
        <CheckCircleOutlineOutlined color="success" sx={{ fontSize: { xs: 24, md: 32 } }} />
      );
      break;
    case 'info':
      // info icon + blue
      borderColor = '#0288D1';
      iconType = <InfoOutlined color="info" sx={{ fontSize: { xs: 24, md: 32 } }} />;
      break;
    case 'warning':
      // warning icon + orange/red
      borderColor = '#EDBF02';
      iconType = <WarningAmberOutlined color="warning" sx={{ fontSize: { xs: 24, md: 32 } }} />;
      break;
    default:
      // by default will set to success
      borderColor = '#2E7D32';
      iconType = (
        <CheckCircleOutlineOutlined color="success" sx={{ fontSize: { xs: 24, md: 32 } }} />
      );
  }
  // the styling of the modal box
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

  return (
    <div>
      <Button onClick={handleOpen} sx={modalButtonStyle}>
        {modalButtonName}
      </Button>
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
                {/* select input box */}
                <InputLabel htmlFor="outlined-adornment-amount">Offer Amount</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Amount"
                  value={selectInput}
                  onChange={(e) => setselectInput(e.target.value)}
                />

                <Box textAlign="center" display="flex">
                  {/* Left Button Text */}
                  <Button
                    variant={leftButtonText != null ? 'outlined' : 'contained'}
                    sx={{
                      bgcolor: leftButtonText != null ? '' : borderColor,
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

                  {/* Right Button Text */}
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: borderColor,
                      width: leftButtonText != null ? 1 / 2 : 1,
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
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalSelect;
