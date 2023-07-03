import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { useResponsiveness } from '@inc/ui';

type FilterChipsProps = {
  onData: (newData: string) => void;
};

const options = ['ALL', 'FROM BUYERS', 'FROM SELLERS'];
const optionsCn = ['全部', '来自买家', '来自卖家'];

const FilterChips = ({ onData }: FilterChipsProps) => {
  const { i18n, t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState('ALL');
  const [selected, setSelected] = useState(false);

  const tOptions = i18n.language === 'en' ? options : optionsCn;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const label = event.currentTarget.textContent;
    let filterParam = '';
    if (label === options[0] || label === optionsCn[0]) {
      filterParam = '';
    } else if (label === options[1] || label === optionsCn[1]) {
      filterParam = 'buyer';
    } else if (label === options[2] || label === optionsCn[2]) {
      filterParam = 'seller';
    }
    setSelected(!selected);
    setSelectedValue(label || '');
    onData(filterParam || '');
  };

  const [isSm] = useResponsiveness(['sm']);

  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container spacing={1}>
        {tOptions.map((option) => (
          <Grid item key={option}>
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
                ...(selectedValue === option && {
                  backgroundColor: palette.primary[400],
                  color: palette.common.white,
                }),
                ...(isSm ? { mb: spacing(1) } : { mr: spacing(1) }),
              })}
              variant="outlined"
              label={option}
              onClick={handleClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FilterChips;
