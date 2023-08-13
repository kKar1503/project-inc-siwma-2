import { useState, useMemo } from 'react';
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
import { ParameterResponseBody, Parameter } from '@/utils/api/client/zod';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import createParameter from '@/middlewares/createParameter';
import OnLeaveModal from '@/components/modals/OnLeaveModal';
import OptionsErrorModal from '@/components/modals/OptionsErrorModal';
import SuccessModal from '@/components/modals/SuccessModal';
import ErrorModal from '@/components/modals/ErrorModal';

export type TypeProps = 'WEIGHT' | 'DIMENSION' | 'TWO_CHOICES' | 'MANY_CHOICES' | 'OPEN_ENDED';
export type DataTypeProps = 'string' | 'number' | 'boolean';

export type ParameterProps = {
  data: ParameterResponseBody[];
};

const usePostParameter = (paramBody: ParameterResponseBody) => {
  const { data } = useQuery(['parameter', paramBody], async () => createParameter(paramBody), {
    enabled: paramBody !== undefined,
  });

  return data;
};

const CreateParameter = () => {
  const theme = useTheme();
  const { spacing } = theme;
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const router = useRouter();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [type, setType] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [dataType, setDataType] = useState('');

  const [nameError, setNameError] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const [optionsError, setOptionsError] = useState('');

  const [openLeave, setOpenLeave] = useState<boolean>(false);
  const [openMany, setOpenMany] = useState<boolean>(false);
  const [createItem, setCreateItem] = useState<boolean>(false);
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

  const handleDataTypeChange = (e: SelectChangeEvent) => {
    const selectedDataType = e.target.value;
    setDataType(selectedDataType);
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

  const postParameter = async () => {
    const paramBody: ParameterResponseBody = {
      id: '',
      name,
      displayName,
      type: type as 'WEIGHT' | 'DIMENSION' | 'TWO_CHOICES' | 'MANY_CHOICES' | 'OPEN_ENDED',
      dataType: dataType as 'string' | 'number' | 'boolean',
      options,
    };

    await createParameter(paramBody);
  };

  const handleSubmit = async () => {
    try {
      if (type === 'MANY_CHOICES' && options.length < 3) {
        setOpenMany(true);
        setOptionsError('Please add at least 3 options for parameter type of MANY_CHOICES');
      } else if (type === 'TWO_CHOICES' && options.length < 2) {
        setOpenMany(true);
        setOptionsError('Please add at least 2 options for parameter type of TWO_CHOICES');
      } else {
        await postParameter();
        router.push(`/parameters`);
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenLeave(true);
  };

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
        <title>Create Parameter</title>
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
                  title="Create Parameter"
                  subheader="Enter values to create a new parameter"
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
                      ((type === 'MANY_CHOICES' || type === 'TWO_CHOICES') &&
                        options.some((option) => option.trim() === ''))
                    }
                  >
                    Create
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
          <SuccessModal
            title="Successfully Created!"
            content="Parameter has been successfully created"
            open={createItem}
            setOpen={setCreateItem}
            buttonText="Return"
            path="/parameters"
          />
          <ErrorModal
            title="Error"
            content="An error has occured"
            open={openError}
            setOpen={setError}
            buttonText="Return"
            path="/parameters"
          />
        </Box>
      </Container>
    </>
  );
};

export default CreateParameter;
