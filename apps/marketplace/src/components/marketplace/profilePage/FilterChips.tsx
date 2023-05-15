import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

type FilterChipsProps = {
  onData: (newData: string) => void;
};

const options = ['ALL', 'FROM BUYERS', 'FROM SELLERS'];

const FilterChips = ({ onData }: FilterChipsProps) => {
  const [selectedValue, setSelectedValue] = useState('ALL');

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const label = event.currentTarget.textContent;
    setSelectedValue(label || '');
    onData(label || '');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Chip
        sx={({ typography, spacing, palette }) => ({
          // conditional styling
          width: '100%',
          height: '42px',
          fontSize: typography.subtitle1,
          fontWeight: 500,
          borderRadius: '20px',
          backgroundColor: palette.common.white,
          color: palette.primary[400],
          borderColor: palette.primary[400],
          mr: spacing(1),
          ...(selectedValue === 'ALL' && {
            backgroundColor: palette.primary[400],
            color: palette.common.white,
          }),
        })}
        variant="outlined"
        label={options[0]}
        onClick={handleClick}
      />
      <Chip
        sx={({ typography, spacing, palette }) => ({
          // conditional styling
          width: '100%',
          height: '42px',
          fontSize: typography.subtitle1,
          fontWeight: 500,
          borderRadius: '20px',
          backgroundColor: palette.common.white,
          color: palette.primary[400],
          borderColor: palette.primary[400],
          mr: spacing(1),
          ...(selectedValue === 'FROM BUYERS' && {
            backgroundColor: palette.primary[400],
            color: palette.common.white,
          }),
        })}
        variant="outlined"
        label={options[1]}
        onClick={handleClick}
      />
      <Chip
        sx={({ typography, spacing, palette }) => ({
          // conditional styling
          width: '100%',
          height: '42px',
          fontSize: typography.subtitle1,
          fontWeight: 500,
          borderRadius: '20px',
          backgroundColor: palette.common.white,
          color: palette.primary[400],
          borderColor: palette.primary[400],
          mr: spacing(1),
          ...(selectedValue === 'FROM SELLERS' && {
            backgroundColor: palette.primary[400],
            color: palette.common.white,
          }),
        })}
        variant="outlined"
        label={options[2]}
        onClick={handleClick}
      />
    </Box>
  );
};

export default FilterChips;
