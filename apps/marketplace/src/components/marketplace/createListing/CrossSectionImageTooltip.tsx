import React from 'react';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import S3Image from '@/components/S3Image';
import { useResponsiveness } from '@inc/ui';
import { Box, ClickAwayListener } from '@mui/material';

export type CrossSectionImageType = {
  data: string;
};

const CrossSectionImageTooltip = ({ data }: CrossSectionImageType) => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  console.log({ data });

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box display="flex">
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          placement="bottom-start"
          disableFocusListener
          disableHoverListener
          disableTouchListener
          onClose={handleTooltipClose}
          open={open}
          title={
            data !== '' ? (
              <S3Image
                src={data}
                alt="cross section image"
                height={((isLg || isMd) && '200') || (isSm && '150') || '100'}
                width={((isLg || isMd) && '200') || (isSm && '150') || '100'}
              />
            ) : (
              <Image
                src="/images/placeholder.png"
                alt="cross section image"
                height={((isLg || isMd) && '200') || (isSm && '150') || '100'}
                width={((isLg || isMd) && '200') || (isSm && '150') || '100'}
              />
            )
          }
        >
          <InfoOutlinedIcon sx={{ ml: 1 }} onClick={handleTooltipOpen} />
        </Tooltip>
      </Box>
    </ClickAwayListener>
  );
};

export default CrossSectionImageTooltip;
