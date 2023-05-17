import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MenuItem from '@mui/material/MenuItem';
import { ParameterType } from '@prisma/client';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type CategoryParameterProps = {
  parameterId: string;
  required: boolean;
};

export type ParameterFormProps = {
  paramId: string;
  value: string;
};

export type ParameterProps = {
  id: string;
  name: string;
  displayName: string;
  type: string;
  dataType: string;
  options?: string[];
};

export type SetParameterProps = {
  setParameters: (parameters: ParameterFormProps[]) => void;
  data: ParameterProps[];
};

const ParameterForm = ({ setParameters, data }: SetParameterProps) => {
  const [formValues, setFormValues] = useState<{ [key: string]: ParameterFormProps }>({});

  const handleFormValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
    parameterId: string
  ) => {
    // Update the form values state
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [parameterId]: { paramId: parameterId, value: event.target.value as string },
    }));

    // Convert the form values object to an array and update the form values array state
    const formValuesArray = Object.values({
      ...formValues,
      [parameterId]: { paramId: parameterId, value: event.target.value as string },
    });

    setParameters(formValuesArray);
  };

  return (
    <Grid item xs={12} md={12} sx={{ width: '100%' }}>
      <Grid item xs={12} md={12} mb={2} sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Category Parameters
        </Typography>
        <Typography variant="body1">
          Enter the parameters specific to the chosen category
        </Typography>
      </Grid>

      <Grid container item xs={12} md={12} spacing={2} sx={{ width: '100%' }}>
        {data.map((parameter: ParameterProps) => {
          switch (parameter.type) {
            case ParameterType.WEIGHT:
              return (
                <Grid item xs={4} md={4} sx={{ width: '100%' }}>
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
                <Grid item xs={4} md={4} sx={{ width: '100%' }}>
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
                <Grid item xs={12} md={12} sx={{ width: '100%' }}>
                  <FormLabel>{parameter.displayName}</FormLabel>
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
                <Grid item xs={4} md={4} sx={{ width: '100%' }}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>{parameter.displayName}</InputLabel>
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
                  </FormControl>
                </Grid>
              );
            case ParameterType.OPEN_ENDED:
              return (
                <Grid item xs={12} md={12} sx={{ width: '100%' }}>
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
