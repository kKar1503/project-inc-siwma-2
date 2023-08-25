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
import SuccessModal from '@/components/modals/SuccessModal';
import ErrorModal from '@/components/modals/ErrorModal';
import SpinnerPage from '@/components/fallbacks/SpinnerPage';

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
  const { data, error, isError, isFetched } = useQuery(
    'parameter',
    async () => fetchParameterById(parameterId),
    {
      enabled: parameterId !== undefined,
    }
  );
  return { data, error, isError, isFetched };
};

const EditParameter = () => {
  const theme = useTheme();
  const { spacing } = theme;
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const router = useRouter();
  const id = router.query.id as string;
  const queryClient = useQueryClient();
  const parameterData = useGetParameter(id);

  const [name, setName] = useState<string>(parameterData.data?.name || '');
  const [displayName, setDisplayName] = useState<string>(parameterData.data?.displayName || '');
  const [type, setType] = useState<string>(parameterData.data?.type || '');
  const [options, setOptions] = useState<string[]>(
    parameterData.data?.options && Array.isArray(parameterData.data?.options)
      ? parameterData.data?.options
      : ['', '', '']
  );

  const [dataType, setDataType] = useState<string>(parameterData.data?.dataType || '');

  const [displayNameError, setDisplayNameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [optionsError, setOptionsError] = useState<string[]>(Array(options.length).fill(''));
  const [generalOptionsError, setGeneralOptionsError] = useState<string>('');
  const [generalError, setGeneralError] = useState<string>('');

  const [openLeave, setOpenLeave] = useState<boolean>(false);
  const [openMany, setOpenMany] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<boolean>(false);
  const [openError, setError] = useState<boolean>(false);

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

    const newOptionsErrors = [...optionsError];
    if (value.trim() === '') {
      newOptionsErrors[index] = 'Please enter an option';
    } else {
      newOptionsErrors[index] = '';
    }
    setOptionsError(newOptionsErrors);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (indexToRemove: number) => {
    setOptions((prevOptions) => prevOptions.filter((_, index) => index !== indexToRemove));
  };

  const renderCustomOptions = () => {
    if (type === 'TWO_CHOICES') {
      return (
        <>
          <TextField
            label="Option 1"
            placeholder="Long"
            value={options[0]}
            onChange={(e) => handleOptionChange(0, e.target.value)}
            error={!!optionsError[0]}
            helperText={optionsError[0]}
            variant="outlined"
            sx={({ spacing }) => ({
              width: '100%',
              mt: spacing(2),
            })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Option 2"
            placeholder="Short"
            value={options[1]}
            onChange={(e) => handleOptionChange(1, e.target.value)}
            error={!!optionsError[1]}
            helperText={optionsError[1]}
            variant="outlined"
            sx={({ spacing }) => ({
              width: '100%',
              mt: spacing(2),
            })}
            InputLabelProps={{ shrink: true }}
          />
        </>
      );
    }
    if (type === 'MANY_CHOICES') {
      return (
        <>
          <TextField
            label="Option 1"
            placeholder="Long"
            value={options[0]}
            onChange={(e) => handleOptionChange(0, e.target.value)}
            error={!!optionsError[0]}
            helperText={optionsError[0]}
            variant="outlined"
            sx={({ spacing }) => ({
              width: '100%',
              mt: spacing(2),
            })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Option 2"
            placeholder="Short"
            value={options[1]}
            onChange={(e) => handleOptionChange(1, e.target.value)}
            error={!!optionsError[1]}
            helperText={optionsError[1]}
            variant="outlined"
            sx={({ spacing }) => ({
              width: '100%',
              mt: spacing(2),
            })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Option 3"
            placeholder="Short"
            value={options[2]}
            onChange={(e) => handleOptionChange(2, e.target.value)}
            error={!!optionsError[2]}
            helperText={optionsError[2]}
            variant="outlined"
            sx={({ spacing }) => ({
              width: '100%',
              mt: spacing(2),
            })}
            InputLabelProps={{ shrink: true }}
          />
          {options.slice(3).map((option, index) => (
            <div key={`option-${index + 3}`}>
              <TextField
                label={`Option ${index + 4}`}
                placeholder="Long"
                value={option}
                onChange={(e) => handleOptionChange(index + 3, e.target.value)}
                error={!!optionsError[index + 3]}
                helperText={optionsError[index + 3]}
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
                      <IconButton onClick={() => handleRemoveOption(index + 3)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
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

  const useUpdateParamMutation = (parameterId: string) =>
  useMutation(
    (updatedParameterData: ParameterResponseBody) =>
      updateParameter(updatedParameterData, parameterId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('parameter');
        setEditItem(true);
      },
      onError: (error) => {
        setError(true);
        if (typeof parameterData.error === 'string') {
          setGeneralError(parameterData.error);
        } else if (typeof parameterData.error === 'object' && parameterData.error !== null) {
          const errorObject = parameterData.error as Record<string, any>;
          if ('message' in errorObject && typeof errorObject.message === 'string') {
            setGeneralError(errorObject.message);
          } else {
            setGeneralError('An unknown error occurred.');
          }
        } else {
          setGeneralError('An unknown error occurred.');
        }
      },
    }
  );


  const mutation = useUpdateParamMutation(id);

  const handleSubmit = () => {
    if (type === 'MANY_CHOICES' && options.length < 3) {
      setOpenMany(true);
      setGeneralOptionsError('Please enter options for parameter type of MANY_CHOICES');
    } else if (type === 'TWO_CHOICES' && options.length < 2) {
      setOpenMany(true);
      setGeneralOptionsError('Please enter options for parameter type of TWO_CHOICES');
    }
    const requestBody: ParameterResponseBody = {
      id,
      name,
      displayName,
      type: type as 'WEIGHT' | 'DIMENSION' | 'TWO_CHOICES' | 'MANY_CHOICES' | 'OPEN_ENDED',
      options,
      dataType: dataType as 'string' | 'number' | 'boolean',
      unit: 'unit', // Temporary, please change this later
    };
    mutation.mutate(requestBody);
  };

  useEffect(() => {
    if (parameterData.isFetched) {
      if (parameterData.isError) {
        if (
          'status' in (parameterData.error as any) &&
          (parameterData.error as any).status === 404
        ) {
          setGeneralError((parameterData.error as any)|| 'An unknown error occurred.');
          router.replace('/404');
        } else {
          router.replace('/500');
        }
      } else if (parameterData.data === undefined) {
        router.replace('/500');
      } else {
        setName(parameterData.data?.name || '');
        setDisplayName(parameterData.data?.displayName || '');
        setType(parameterData.data?.type || '');
        setOptions(parameterData.data?.options ?? []);
        setDataType(parameterData.data?.dataType || '');
      }
    }
  }, [parameterData.isFetched, parameterData.isError, parameterData.data]);

  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries('parameter');
      router.push(`/parameters`);
    }
    if (mutation.isError) {
      setError(true);
    }
  }, [mutation.isSuccess, mutation.isError, id]);

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
                    Update
                  </Button>

                  <OptionsErrorModal
                    open={openMany}
                    setOpen={setOpenMany}
                    errorMessage={generalOptionsError}
                  />
                  <SuccessModal
                    title="Successfully Edited!"
                    content="Parameter has been successfully edited"
                    open={editItem}
                    setOpen={setEditItem}
                    buttonText="Return"
                    path="/parameters"
                  />
                  <ErrorModal
                    title="Error"
                    content={generalError}
                    open={openError}
                    setOpen={setError}
                    buttonText="Return"
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
