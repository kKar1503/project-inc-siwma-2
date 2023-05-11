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
import { createTheme } from '@mui/material/styles';

// declaring props for TransitionsModal
type ComponentProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  buttonColor: `#${string}`;
  title: string;
  content: string;
  leftButtonText: string | null;
  rightButtonText: string;
  selectInput: string | number;
  setselectInput: React.Dispatch<React.SetStateAction<string | number>>;
  leftButtonState: boolean;
  rightButtonState: boolean;
  setLeftButtonState: React.Dispatch<React.SetStateAction<boolean>>;
  setRightButtonState: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalInput = ({
  open,
  setOpen,
  buttonColor,
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
  const handleClose = () => setOpen(false);

  const theme = createTheme({
    palette: {
      text: {
        primary: '#013654',
      },
    },
  });

  return (
    <div>
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
              <Box sx={{ width: 1 }}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: { xs: 'subtitle1', sm: 'h5' },
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
                {/* $$ input box */}
                <FormControl fullWidth sx={{ my: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                  <FilledInput
                    sx={{ backgroundColor: 'transparent', border: '1px solid', borderRadius: 2 }}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    onChange={(e) => setselectInput(e.target.value)}
                  />
                </FormControl>
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
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalInput;
