import { useMemo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useResponsiveness } from '@inc/ui';
import S3CardImage from '@/components/S3CardImage';

export type S3ImagePreviewProps = {
  close: () => void;
  title: string;
  src: string | null;
};

const S3ImagePreview = ({ close, title, src }: S3ImagePreviewProps) => {
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

  const open = !!src;

  return (
    <Box>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={() => {
          close();
        }}
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
                  id='transition-modal-title'
                  variant='h6'
                  component='h2'
                  sx={({ palette }) => ({
                    color: palette.info[800],
                    fontSize: '24px',
                  })}
                >
                  {title}
                </Typography>
                {/* errors will be fixed for S3Images in another PR ignore for now TODO remove ignores */}
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <S3CardImage src={src} alt='Image Preview'/>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default S3ImagePreview;
