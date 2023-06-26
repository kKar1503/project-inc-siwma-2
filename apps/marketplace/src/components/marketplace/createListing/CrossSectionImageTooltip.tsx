import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import S3Image from '@/components/S3Image';

export type CrossSectionImageType = {
  data: string;
};

const CrossSectionImageTooltip = ({ data }: CrossSectionImageType) => (
  <Tooltip title={<S3Image src={data} alt="cross section image" height="100" width="100" />}>
    <InfoOutlinedIcon sx={{ ml: 1 }} />
  </Tooltip>
);

export default CrossSectionImageTooltip;
