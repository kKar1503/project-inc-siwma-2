import { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import { ParameterResponseBody } from '@/utils/api/client/zod';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import updateParameter from '@/middlewares/updateParameter';
import fetchParameterById from '@/middlewares/fetchParameterById';
import OnLeaveModal from '@/components/modals/OnLeaveModal';
import OptionsErrorModal from '@/components/modals/OptionsErrorModal';

export type TypeProps = 'WEIGHT' | 'DIMENSION' | 'TWO_CHOICES' | 'MANY_CHOICES' | 'OPEN_ENDED';
export type DataTypeProps = 'string' | 'number' | 'boolean';

export type EditParameterProps = {
  parameter: string;
  updateData: () => void;
};

export type ParameterProps = {
  data: ParameterResponseBody[];
};

const useGetParameter = (parameterId: string) => {
  const { data } = useQuery(
    ['parameter', parameterId],
    async () => fetchParameterById(parameterId),
    {
      enabled: parameterId !== undefined,
    }
  );

  return data;
};

const useUpdateParamMutation = (parameterId: string) =>
  useMutation((updatedParameterData: ParameterResponseBody) =>
    updateParameter(updatedParameterData, parameterId)
  );

const EditParameter = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = router.query.id as string;
  const parameterData = useGetParameter(id);

  const theme = useTheme();
  const { spacing } = theme;
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [name, setName] = useState<string>(parameterData?.name || '');
  const [displayName, setDisplayName] = useState<string>(parameterData?.displayName || '');
  const [type, setType] = useState<string>(parameterData?.type || '');
  const [options, setOptions] = useState<string[]>(
    parameterData?.options && Array.isArray(parameterData?.options) ? parameterData.options : []
  );
  const [dataType, setDataType] = useState<string>(parameterData?.dataType || '');

  const [displayNameError, setDisplayNameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [optionsError, setOptionsError] = useState('');

  const [openLeave, setOpenLeave] = useState<boolean>(false);
  const [openMany, setOpenMany] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);

    if (newName.trim() === '') {
      setNameError('Please enter a name');
    } else {
      setNameError('');
    }
  };

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDisplayName = e.target.value;
    setDisplayName(newDisplayName);

    if (newDisplayName.trim() === '') {
      setDisplayNameError('Please enter a display name');
    } else {
      setDisplayNameError('');
    }
  };

  const handleTypeChange = (e: SelectChangeEvent) => {
    setType(e.target.value);
    setOptions([]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);

    if (value.trim() === '') {
      setOptionsError('Please enter an option');
    } else {
      setOptionsError('');
    }
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (indexToRemove: number) => {
    setOptions((prevOptions) => prevOptions.filter((_, index) => index !== indexToRemove));
  };

  const renderCustomOptions = () => {
    if (type === 'TWO_CHOICES' || type === 'MANY_CHOICES') {
      return (
        <>
          {options.map((options, index) => (
            <TextField
              label={`Option ${index + 1}`}
              placeholder="Long"
              value={options}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              error={!!optionsError}
              helperText={optionsError}
              variant="outlined"
              sx={({ spacing }) => ({
                width: '100%',
                mt: spacing(2),
              })}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton onClick={() => handleRemoveOption(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ))}
          <Button
            onClick={handleAddOption}
            variant="contained"
            sx={({ spacing, palette }) => ({
              width: '15%',
              mt: spacing(2),
              bgcolor: palette.secondary[600],
            })}
          >
            Add Option
          </Button>
        </>
      );
    }
    return null;
  };

  const handleDataTypeChange = (e: SelectChangeEvent) => {
    const selectedDataType = e.target.value;
    setDataType(selectedDataType);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenLeave(true);
  };

  const mutation = useUpdateParamMutation(id);

  const handleSubmit = () => {
    const requestBody: ParameterResponseBody = {
      id,
      name,
      displayName,
      type: type as 'WEIGHT' | 'DIMENSION' | 'TWO_CHOICES' | 'MANY_CHOICES' | 'OPEN_ENDED',      
      options,
      dataType: dataType as 'string' | 'number' | 'boolean',
    };

    mutation.mutate(requestBody);
  };

  // useEffect(() => {
  //   if (parameterData) {
  //     setName(parameterData?.name || '');
  //     setDisplayName(parameterData?.displayName || '');
  //     setType(parameterData?.type || '');
  //     setOptions(parameterData?.options || '');
  //     setDataType(parameterData?.dataType || '');
  //   }
  // }, [parameterData]);

  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries('parameter');
      router.push(`/categoryManagement/parameters`);
    }
  }, [mutation.isSuccess, queryClient, router, id]);

  const tableStyle = useMemo(() => {
    if (isSm) {
      return {
        py: spacing(3),
        px: '20px',
      };
    }
    if (isMd) {
      return {
        py: spacing(3),
        px: '40px',
      };
    }
    if (isLg) {
      return {
        py: spacing(3),
        px: '60px',
      };
    }
    return {
      py: spacing(3),
      px: '20px',
    };
  }, [isSm, isMd, isLg]);

  return (
    <>
      <Head>
        <title>Edit Parameter</title>
      </Head>
      <Container sx={tableStyle}>
        <Box>
          <Grid
            item
            onSubmit={handleSubmit}
            sx={({ spacing }) => ({
              ml: spacing(1),
              width: '100%',
            })}
          >
            <Card>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CardHeader
                  titleTypographyProps={{
                    fontSize: 16,
                  }}
                  subheaderTypographyProps={{
                    fontSize: 16,
                  }}
                  title="Edit Parameter"
                  subheader="Edit values to a current parameter"
                />
                <Box
                  sx={({ spacing }) => ({
                    justifyContent: 'flex-end',
                    ml: 'auto',
                    mr: spacing(2),
                  })}
                >
                  <Button
                    variant="contained"
                    color="error"
                    sx={({ palette }) => ({ bgcolor: palette.error[400] })}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <OnLeaveModal open={openLeave} setOpen={setOpenLeave} />
                </Box>
              </Box>

              <Divider
                variant="middle"
                sx={({ palette }) => ({ color: palette.divider, height: '1px' })}
              />

              <CardContent>
                <TextField
                  label="Parameter Name"
                  placeholder="Thickness (Hollow Sections)"
                  InputLabelProps={{ shrink: true }}
                  value={name}
                  onChange={handleNameChange}
                  error={!!nameError}
                  helperText={nameError}
                  sx={({ spacing }) => ({
                    mr: spacing(2),
                    mt: spacing(2),
                    width: '100%',
                  })}
                />

                <TextField
                  label="Display Name"
                  placeholder="Length"
                  InputLabelProps={{ shrink: true }}
                  value={displayName}
                  onChange={handleDisplayNameChange}
                  error={!!displayNameError}
                  helperText={displayNameError}
                  sx={({ spacing }) => ({
                    mt: spacing(2),
                    width: '100%',
                  })}
                />

                <FormControl
                  sx={({ spacing }) => ({ mr: spacing(3), width: '100%', mt: spacing(2) })}
                >
                  <InputLabel>Parameter Type</InputLabel>
                  <Select label="Parameter Type" value={type} onChange={handleTypeChange}>
                    <MenuItem value="WEIGHT">WEIGHT</MenuItem>
                    <MenuItem value="DIMENSION">DIMENSION</MenuItem>
                    <MenuItem value="TWO_CHOICES">TWO_CHOICES</MenuItem>
                    <MenuItem value="MANY_CHOICES">MANY_CHOICES</MenuItem>
                    <MenuItem value="OPEN_ENDED">OPEN_ENDED</MenuItem>
                  </Select>
                </FormControl>
                {renderCustomOptions()}

                <FormControl
                  sx={({ spacing }) => ({ mr: spacing(3), width: '100%', mt: spacing(2) })}
                >
                  <InputLabel>Data Type</InputLabel>
                  <Select label="Data Type" value={dataType} onChange={handleDataTypeChange}>
                    <MenuItem value="string">String</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="boolean">Boolean</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>

              <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 'auto' }}>
                <Box
                  sx={({ spacing }) => ({
                    width: '98%',
                    mt: spacing(3),
                    display: 'flex',
                    justifyContent: 'flex-end',
                  })}
                >
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    type="submit"
                    sx={({ spacing, palette }) => ({
                      mt: 'auto',
                      mb: spacing(1),
                      '&.Mui-disabled': {
                        bgColor: palette.action.disabled,
                        color: palette.common.white,
                      },
                    })}
                    disabled={
                      name.trim() === '' ||
                      displayName.trim() === '' ||
                      type.trim() === '' ||
                      dataType.trim() === '' || 
                      dataType.trim() === '' ||
                      ((type === 'MANY_CHOICES' || type === 'TWO_CHOICES') &&
                        options.some((option) => option.trim() === ''))
                    }
                  >
                    Confirm
                  </Button>

                  <OptionsErrorModal
                    open={openMany}
                    setOpen={setOpenMany}
                    errorMessage={optionsError}
                  />
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default EditParameter;
