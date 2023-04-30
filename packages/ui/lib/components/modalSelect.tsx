/* Expected props:
  - modalButtonName  (A stringify text for the opening button)
  - modalButtonStyle (An object that contents the sx styling for the opening button)
  - modalType (The button type success/info/warning)
  - title (The title of the modal box)
  - content (The content of the modal box)
  - leftButtonText (The text for the left button)
  - rightButtonText (The text for the right button)
  - dropDownSelect (Boolean option to show a dropdown select box)
  - selectData(The array of data for the dropdown select box)
  - selectInput (The state for the select box)
  - setselectInput (Set state for the select box)
  - leftButtonState (The state for the left button)
  - rightButtonState (The state for the right button)
  - setLeftButtonState (Set the state for left button)
  - setRightButtonState (Set the state for right button)


  Data is expected to contain both buttons, if the dropDownSelect is false, by default it will be a text input box, then data should look like this:
  {
    modalButtonName: string;
    modalButtonStyle: object;
    modalType: string;
    title: string;
    content: string;
    leftButtonText: string;
    rightButtonText: string;
    dropDownSelect: boolean;
    selectData?: string[];
    selectInput: string | number;
    setselectInput: React.Dispatch<React.SetStateAction<string | number>>;
    leftButtonState: boolean;
    rightButtonState: boolean;
    setLeftButtonState: React.Dispatch<React.SetStateAction<boolean>>;
    setRightButtonState: React.Dispatch<React.SetStateAction<boolean>>;
  }

  
*/

import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';

// declaring props for TransitionsModal
type ComponentProps = {
  modalButtonName: string;
  modalButtonStyle: object;
  modalType: string;
  title: string;
  content: string;
  leftButtonText: string;
  rightButtonText: string;
  dropDownSelect: boolean;
  selectData?: string[];
  selectInput: string | number;
  setselectInput: React.Dispatch<React.SetStateAction<string | number>>;
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
  dropDownSelect,
  selectData,
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
  // select icon based on the modal type (success/info/warning)
  switch (modalType) {
    case 'success':
      // success+ green
      borderColor = '#2E7D32';
      break;
    case 'info':
      // info + blue
      borderColor = '#0288D1';
      break;
    case 'warning':
      // warning + orange/red
      borderColor = '#ff0000';
      break;
    default:
      // by default will set to success
      borderColor = '#2E7D32';
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
              <Box sx={{ width: 1 }}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    color: '#013654',
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
                      textAlign: 'left',
                    }}
                  >
                    {content}
                  </Typography>
                </Box>
                {/* $$ input box */}
                {dropDownSelect === false && (
                  <FormControl fullWidth sx={{ my: 1 }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                    <FilledInput
                      id="filled-adornment-amount"
                      sx={{ backgroundColor: 'transparent', border: '1px solid', borderRadius: 2 }}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      onChange={(e) => setselectInput(e.target.value)}
                    />
                  </FormControl>
                )}
                {/* select dropdown box */}
                {dropDownSelect === true && (
                  <FormControl
                    variant="filled"
                    sx={{
                      width: 1,
                      backgroundColor: 'transparent',
                      border: '1px solid',
                      borderRadius: 2,
                    }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">Select a Reason</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={selectInput}
                      onChange={(e) => setselectInput(e.target.value as string)}
                    >
                      {selectData instanceof Array &&
                        selectData.map((item) => (
                          <MenuItem value={item} key={item}>
                            {item}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}

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
