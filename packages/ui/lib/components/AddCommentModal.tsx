import React, { useMemo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material//Grid';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import useResponsiveness from '../hooks/useResponsiveness';

export type ComponentProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  buttonColor: `#${string}`;
  userImage: string;
  userName: string;
  inputText: string;
  setInputText: (val: string) => void;
  rating: number | null;
  setRating: React.Dispatch<React.SetStateAction<number | null>>;
  leftButtonText: string | null;
  rightButtonText: string;
  leftButtonState: boolean;
  rightButtonState: boolean;
  setLeftButtonState: React.Dispatch<React.SetStateAction<boolean>>;
  setRightButtonState: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyFormHelperText = () => {
  const { focused } = useFormControl() || {};

  const helperText = useMemo(() => {
    if (focused) {
      return 'Review description is needed.';
    }

    return 'Review description is needed.';
  }, [focused]);

  return (
    <FormHelperText sx={({ palette }) => ({ color: palette.error.main })}>
      {helperText}
    </FormHelperText>
  );
};

const AddCommentModal = ({
  open,
  setOpen,
  buttonColor,
  userImage,
  userName,
  inputText,
  setInputText,
  rating,
  setRating,
  leftButtonText,
  rightButtonText,
  leftButtonState,
  rightButtonState,
  setLeftButtonState,
  setRightButtonState,
}: ComponentProps) => {
  const handleClose = () => setOpen(false);
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { typography } = useTheme();

  // on cancel, clear select value and close modal
  const handleCancel = () => {
    setOpen(false);
    setLeftButtonState(true);
    setInputText('');
  };

  const modalStyles = useMemo(() => {
    if (isSm) {
      return {
        modalWidth: {
          width: '80%',
        },
        buttonTxt: {
          fontSize: '0.9rem',
        },
        starSize: {
          fontSize: '2.0rem',
        },
        avatarSize: {
          width: '35px',
          height: '35px',
        },
        userName: {
          fontSize: typography.subtitle1,
          fontWeight: 500,
        },
        comment: {
          fontSize: typography.subtitle2,
          fontWeight: 500,
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
        starSize: {
          fontSize: '3.0rem',
        },
        avatarSize: {
          width: '50px',
          height: '50px',
        },
        userName: {
          fontSize: typography.h6,
        },
        comment: {
          fontSize: typography.subtitle1,
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
        starSize: {
          fontSize: '3.0rem',
        },
        avatarSize: {
          width: '60px',
          height: '60px',
        },
        userName: {
          fontSize: typography.h5,
        },
        comment: {
          fontSize: typography.h6,
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
              padding: spacing(3),
              position: 'absolute',
              boxShadow: shadows[3],
              backgroundColor: palette.common.white,
              ...modalStyles?.modalWidth,
            })}
          >
            <Box>
              <Box sx={{ justifyContent: 'left' }}>
                <Box
                  sx={({ spacing }) => ({
                    display: 'flex',
                    mb: spacing(2),
                  })}
                >
                  <Avatar sx={{ ...modalStyles?.avatarSize, my: 'auto' }} src={userImage || ''} />
                  <Typography
                    id="transition-modal-title"
                    sx={({ palette, spacing }) => ({
                      color: palette.text.primary,
                      ml: spacing(3),
                      my: 'auto',
                      ...modalStyles?.userName,
                    })}
                  >
                    {userName}
                  </Typography>
                </Box>
                <Grid container justifyContent="center">
                  <Rating
                    sx={{ color: '#00C853', ...modalStyles?.starSize }}
                    icon={<StarIcon style={{ color: '#00C853', ...modalStyles?.starSize }} />}
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </Grid>
                <Box>
                  <Typography
                    id="transition-modal-description"
                    sx={({ spacing }) => ({
                      mt: spacing(2),
                      textAlign: 'left',
                      mb: spacing(1),
                      ...modalStyles?.comment,
                    })}
                  >
                    Description:
                  </Typography>
                  <FormControl sx={{ width: '100%' }}>
                    <OutlinedInput
                      placeholder="Please enter your comment."
                      multiline
                      maxRows={5}
                      value={inputText}
                      error={inputText === ''}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                    {inputText === '' && <MyFormHelperText />}
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Button
                variant={leftButtonText != null ? 'outlined' : 'contained'}
                sx={({ spacing }) => ({
                  bgcolor: leftButtonText != null ? '' : buttonColor,
                  marginRight: spacing(2),
                  width: 1 / 2,
                  marginTop: spacing(2),
                })}
                onClick={handleCancel}
              >
                <Typography sx={modalStyles?.buttonTxt}>{leftButtonText}</Typography>
              </Button>
              {/* Right Button Text */}
              <Button
                variant="contained"
                sx={({ spacing }) => ({
                  bgcolor: buttonColor,
                  width: 1 / 2,
                  marginTop: spacing(2),
                })}
                onClick={() => setRightButtonState(true)}
                disabled={inputText === ''}
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
        </Fade>
      </Modal>
    </div>
  );
};

export default AddCommentModal;
