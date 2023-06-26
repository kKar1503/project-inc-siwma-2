import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MenuItem from '@mui/material/MenuItem';
import { ParameterType } from '@prisma/client';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type dataTypeProps = 'string' | 'number' | 'boolean';

export interface ParameterFormProps {
  paramId: string;
  value: string;
}

export interface CategoryParametersProps {
  parameterId: string;
  required: boolean;
}

export interface ParameterValidationProps {
  parameterId: string;
  error: string;
}

export interface ParameterProps {
  id: string;
  name: string;
  displayName: string;
  type: string;
  dataType: dataTypeProps;
  options?: string[];
}

export interface SetParameterProps {
  parameters?: ParameterFormProps[];
  setParameters: (parameters: ParameterFormProps[]) => void;
  data: ParameterProps[];
  errors: ParameterValidationProps[];
}

const dataTypeToInputType = (dataType: dataTypeProps) => {
  switch (dataType) {
    case 'string':
      return 'text';
    case 'number':
      return 'number';
    case 'boolean':
      return 'checkbox';
    default:
      return 'text';
  }
};

const ParameterForm = ({ parameters, setParameters, data, errors }: SetParameterProps) => {
  const [formValues, setFormValues] = useState<{ [key: string]: ParameterFormProps }>({});

  useEffect(() => {
    if (parameters) {
      const obj: { [key: string]: ParameterFormProps } = {};
      parameters.forEach((v) => {
        obj[v.paramId] = v;
      });
      setFormValues(obj);
    }
  }, [parameters]);

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
    const updatedFormValues = {
      ...formValues,
      [parameterId]: { paramId: parameterId, value: event.target.value as string },
    };

    const formValuesArray = Object.values(updatedFormValues);
    setParameters(formValuesArray);
  };

  const handleErrorMessage = (parameterError: ParameterValidationProps | undefined) => {
    if (parameterError) {
      return parameterError.error;
    }
    return '';
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
                <Grid item xs={4} md={4} sx={{ width: '100%' }} key={parameter.id}>
                  <TextField
                    className="outlined-adornment-weight"
                    size="medium"
                    label={parameter.displayName}
                    type={dataTypeToInputType(parameter.dataType)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    value={formValues[parameter.id]?.value || ''}
                    onChange={(event) => handleFormValueChange(event, parameter.id)}
                    error={errors.some((error) => error.parameterId === parameter.id)}
                    helperText={handleErrorMessage(
                      errors.find((error) => error.parameterId === parameter.id)
                    )}
                    fullWidth
                  />
                </Grid>
              );
            case ParameterType.DIMENSION:
              return (
                <Grid item xs={4} md={4} sx={{ width: '100%' }} key={parameter.id}>
                  <TextField
                    size="medium"
                    label={parameter.displayName}
                    fullWidth
                    type={dataTypeToInputType(parameter.dataType)}
                    value={formValues[parameter.id]?.value || ''}
                    onChange={(event) => handleFormValueChange(event, parameter.id)}
                    error={errors.some((error) => error.parameterId === parameter.id)}
                    helperText={handleErrorMessage(
                      errors.find((error) => error.parameterId === parameter.id)
                    )}
                  />
                </Grid>
              );
            case ParameterType.TWO_CHOICES:
              return (
                <Grid item xs={12} md={12} sx={{ width: '100%' }} key={parameter.id}>
                  {errors.some((error) => error.parameterId === parameter.id) ? (
                    <FormLabel error>{parameter.displayName} is required</FormLabel>
                  ) : (
                    <FormLabel>{parameter.displayName}</FormLabel>
                  )}
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
                <Grid item xs={4} md={4} sx={{ width: '100%' }} key={parameter.id}>
                  <FormControl variant="outlined" fullWidth>
                    {errors.some((error) => error.parameterId === parameter.id) ? (
                      <InputLabel error>{parameter.displayName} is required</InputLabel>
                    ) : (
                      <InputLabel>{parameter.displayName}</InputLabel>
                    )}
                    <Select
                      size="medium"
                      label={parameter.displayName}
                      value={formValues[parameter.id]?.value || ''}
                      onChange={(event) => handleFormValueChange(event, parameter.id)}
                      fullWidth
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
                <Grid item xs={12} md={12} sx={{ width: '100%' }} key={parameter.id}>
                  <TextField
                    label={parameter.displayName}
                    value={formValues[parameter.id]?.value || ''}
                    onChange={(event) => handleFormValueChange(event, parameter.id)}
                    error={errors.some((error) => error.parameterId === parameter.id)}
                    helperText={handleErrorMessage(
                      errors.find((error) => error.parameterId === parameter.id)
                    )}
                    rows={4}
                    multiline
                    fullWidth
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
