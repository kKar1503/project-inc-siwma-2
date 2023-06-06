import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

const MyCarousel = () => {
  const { t } = useTranslation();
   const { i18n } = useTranslation('translation');

   const handlechange = (e: { target: { value: any } }) => {
     const language = e.target.value;
     i18n.changeLanguage(language); // change the language
   };


  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ width: 150, mr: 4 }}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="language"
          onChange={handlechange}
        >
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="cn">CN</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          bgcolor: '#F86262',
          width: 100,
          fontSize: 20,
          color: 'white',
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        {t('listing_tag')}
      </Box>
    </Box>
  );
};

export default MyCarousel;
