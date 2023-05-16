import React, { useEffect, useState, ChangeEvent } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MenuItem from '@mui/material/MenuItem';
import { ParameterType } from '@prisma/client';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type ParameterFormProps = {
  id: string;
  value: string;
};

export type SetParameterProps = {
  setParameters: (parameters: ParameterFormProps[]) => void;
  category: string;
};

export type ParameterProps = {
  id: string;
  name: string;
  displayName: string;
  type: string;
  dataType: string;
  options?: string[];
};

// sample data based on weight, dimension, two choices, many choices, and open-ended
const sampleData = [
  {
    id: '1',
    name: 'weight',
    displayName: 'Weight',
    type: 'WEIGHT',
    dataType: 'NUMBER',
    options: [],
  },
  {
    id: '2',
    name: 'dimension',
    displayName: 'Dimension',
    type: 'DIMENSION',
    dataType: 'NUMBER',
    options: [],
  },
  {
    id: '3',
    name: 'color',
    displayName: 'Color',
    type: 'TWO_CHOICES',
    dataType: 'STRING',
    options: ['Red', 'Blue'],
  },
  {
    id: '4',
    name: 'size',
    displayName: 'Size',
    type: 'MANY_CHOICES',
    dataType: 'STRING',
    options: ['Small', 'Medium', 'Large'],
  },
  {
    id: '5',
    name: 'description',
    displayName: 'Description',
    type: 'OPEN_ENDED',
    dataType: 'STRING',
    options: [],
  },
];

const ParameterForm = ({ setParameters, category }: SetParameterProps) => {
  const [displayParameters, setDisplayParameters] = useState<ParameterProps[]>([]);
  const [formValues, setFormValues] = useState<{ [key: string]: ParameterFormProps }>({});
  const [formValuesArray, setFormValuesArray] = useState<ParameterFormProps[]>([]);

  useEffect(() => {
    // Get parameters from backend using category
    setParameters(formValuesArray);
    setDisplayParameters([]);
  }, [category, formValuesArray, setParameters]);

  const handleFormValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
    parameterId: string
  ) => {
    // Update the form values state
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [parameterId]: { id: parameterId, value: event.target.value as string },
    }));

    // Convert the form values object to an array and update the form values array state
    const formValuesArray = Object.values({
      ...formValues,
      [parameterId]: { id: parameterId, value: event.target.value as string },
    });
    setFormValuesArray(formValuesArray);
  };

  return (
    <Grid item xs={12} md={12} sx={{ width: '100%' }}>
      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Category Parameters
        </Typography>
        <Typography variant="body1">
          Enter the parameters specific to the chosen category
        </Typography>
      </Grid>

      <Grid container item xs={12} md={12} spacing={2} sx={{ width: '100%' }}>
        {displayParameters.map((parameter: ParameterProps) => {
          switch (parameter.type) {
            case ParameterType.WEIGHT:
              return (
                <Grid item xs={4} md={4} sx={{ width: '100%', my: 2 }}>
                  <OutlinedInput
                    className="outlined-adornment-weight"
                    size="medium"
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    fullWidth
                    value={formValues[parameter.id]?.value || ''}
                    onChange={(event) => handleFormValueChange(event, parameter.id)}
                  />
                </Grid>
              );
            case ParameterType.DIMENSION:
              return (
                <Grid item xs={4} md={4} sx={{ width: '100%', my: 2 }}>
                  <TextField
                    size="medium"
                    label={parameter.displayName}
                    fullWidth
                    value={formValues[parameter.id]?.value || ''}
                    onChange={(event) => handleFormValueChange(event, parameter.id)}
                  />
                </Grid>
              );
            case ParameterType.TWO_CHOICES:
              return (
                <Grid item xs={12} md={12} sx={{ width: '100%', my: 2 }}>
                  <FormLabel id="demo-radio-buttons-group-label">{parameter.displayName}</FormLabel>
                  <RadioGroup
                    value={formValues[parameter.id]?.value || ''}
                    onChange={(event) => handleFormValueChange(event, parameter.id)}
                  >
                    {parameter.options &&
                      parameter.options.map((option: string) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                  </RadioGroup>
                </Grid>
              );
            case ParameterType.MANY_CHOICES:
              return (
                <Grid item xs={4} md={4} sx={{ width: '100%', my: 2 }}>
                  <Select
                    size="medium"
                    label={parameter.displayName}
                    fullWidth
                    value={formValues[parameter.id]?.value || ''}
                    onChange={(event) => handleFormValueChange(event, parameter.id)}
                  >
                    {parameter.options &&
                      parameter.options.map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                  </Select>
                </Grid>
              );
            case ParameterType.OPEN_ENDED:
              return (
                <Grid item xs={12} md={12} sx={{ width: '100%', my: 2 }}>
                  <TextField
                    label={parameter.displayName}
                    rows={4}
                    value={formValues[parameter.id]?.value || ''}
                    multiline
                    fullWidth
                    onChange={(event) => handleFormValueChange(event, parameter.id)}
                  />
                </Grid>
              );
            default:
              return null;
          }
        })}

        <Divider sx={{ my: 2 }} />
      </Grid>
    </Grid>
  );
};

export default ParameterForm;
