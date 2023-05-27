import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';

export type ComponentProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  buttonColor: `#${string}`;
  title: string;
  content?: string;
  leftButtonText: string;
  rightButtonText: string;
  selectData?: string[];
  selectInput: string | number;
  setselectInput: (val: string) => void;
  leftButtonState: boolean;
  rightButtonState: boolean;
  setLeftButtonState: (val: boolean) => void;
  setRightButtonState: (val: boolean) => void;
};

const ModalSelect = ({
  open,
  setOpen,
  buttonColor,
  title,
  content,
  leftButtonText,
  rightButtonText,
  selectData,
  selectInput,
  setselectInput,
  leftButtonState,
  rightButtonState,
  setLeftButtonState,
  setRightButtonState,
}: ComponentProps) => {
  const handleClose = () => setOpen(false);
  const isMinWidth = useMediaQuery('(min-width:600px)');

  // on cancel, clear select value and close modal
  const handleCancel = () => {
    setOpen(false);
    setLeftButtonState(true);
    setselectInput('');
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
                {/* select dropdown box */}
                <FormControl
                  variant="filled"
                  sx={{
                    width: 1,
                    my: 2,
                    backgroundColor: 'transparent',
                    borderRadius: 2,
                  }}
                >
                  <InputLabel sx={{ fontSize: '20px' }}>Select a Reason</InputLabel>
                  <Select
                    labelId="select-filled-label"
                    value={selectInput}
                    sx={{ fontSize: '20px', backgroundColor: 'transparent' }}
                    onChange={(e) => setselectInput(e.target.value as string)}
                  >
                    {Array.isArray(selectData) &&
                      selectData.map((item) => (
                        <MenuItem value={item} key={item} sx={{ fontSize: '20px' }}>
                          {item}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <Box textAlign="center" display="flex">
                  {/* Left Button Text */}
                  <Button
                    variant={leftButtonText != null ? 'outlined' : 'contained'}
                    sx={({ spacing }) => ({
                      bgcolor: leftButtonText != null ? '' : buttonColor,
                      marginRight: '16px',
                      width: 1 / 2,
                      marginTop: spacing(2),
                      padding: isMinWidth ? '7px 20px' : '2px 4px',
                    })}
                    onClick={handleCancel}
                  >
                    <Typography sx={{ fontSize: { xs: 'overline', sm: 'subtitle1' } }}>
                      {leftButtonText}
                    </Typography>
                  </Button>

                  {/* Right Button Text */}
                  <Button
                    variant="contained"
                    sx={({ spacing }) => ({
                      bgcolor: buttonColor,
                      width: 1 / 2,
                      marginTop: spacing(2),
                      padding: isMinWidth ? '7px 20px' : '2px 4px',
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

export default ModalSelect;
