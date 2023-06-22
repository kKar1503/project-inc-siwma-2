import { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SelectComponentProps = {
  onData: (newData: string) => void;
  displayValues: string[];
  values: string[];
};

const SelectComponent = ({ onData, displayValues, values }: SelectComponentProps) => {
  const [selectedValue, setSelectedValue] = useState(displayValues[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    onData(event.target.value);
  };

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 160 }}>
        <Select
          labelId="my-select-label"
          id="my-select"
          value={selectedValue}
          onChange={handleChange}
          sx={({ shape }) => ({ borderRadius: shape, fontSize: '12px' })}
        >
          {displayValues.map((value, index) => (
            <MenuItem sx={{ fontSize: '12px' }} value={values[index]} key={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
