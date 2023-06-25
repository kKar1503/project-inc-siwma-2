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
import { useMemo } from 'react';
import useResponsiveness from '../hook/useResponsiveness';

export type ComponentProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  buttonColor: `#${string}`;
  title: string;
  content: string;
  leftButtonText: string | null;
  rightButtonText: string;
  selectInput: string | number;
  setselectInput: (val: number) => void;
  leftButtonState: boolean;
  rightButtonState: boolean;
  setLeftButtonState: (val: boolean) => void;
  setRightButtonState: (val: boolean) => void;
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

  const handleCancel = () => {
    setOpen(false);
    setLeftButtonState(true);
    setselectInput(0);
  };

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
                {/* $$ input box */}
                <FormControl fullWidth sx={{ my: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                  <FilledInput
                    sx={{ backgroundColor: 'transparent', border: '1px solid', borderRadius: 2 }}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    onChange={(e) => setselectInput(parseFloat(e.target.value))}
                  />
                  {(selectInput === 0 || Number.isNaN(selectInput)) && (
                    <Typography variant="caption" color="error" paddingTop={1}>
                      Please enter a valid number.
                    </Typography>
                  )}
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
                      })}
                      onClick={handleCancel}
                    >
                      <Typography sx={modalStyles?.buttonTxt}>{leftButtonText}</Typography>
                    </Button>
                  )}

                  {/* Right Button Text */}
                  <Button
                    variant="contained"
                    disabled={selectInput === 0 || Number.isNaN(selectInput)}
                    sx={({ spacing }) => ({
                      bgcolor: buttonColor,
                      width: 1 / 2,
                      marginTop: spacing(2),
                    })}
                    onClick={() => setRightButtonState(true)}
                  >
                    <Typography
                      sx={({ palette }) => ({
                        color: palette.common.white,
                        ...modalStyles?.buttonTxt,
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
