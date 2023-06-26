import React from 'react';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useResponsiveness } from '@inc/ui';

export type CrossSectionImageType = {
  data: string;
};

const CrossSectionImageTooltip = ({ data }: CrossSectionImageType) => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  return (
    <Tooltip
      title={
        <Image
          src={data === '' ? data : '/images/placeholder.png'}
          alt="cross section image"
          height={((isLg || isMd) && '200') || (isSm && '150') || '100'}
          width={((isLg || isMd) && '200') || (isSm && '150') || '100'}
        />
      }
    >
      <InfoOutlinedIcon sx={{ ml: 1 }} />
    </Tooltip>
  );
};

export default CrossSectionImageTooltip;