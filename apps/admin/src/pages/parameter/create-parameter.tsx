import { useState, useMemo, FormEvent } from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import { ParameterResponseBody, Parameter } from '@/utils/api/client/zod';
import { useQuery} from 'react-query';
// import createParameter from '@/middlewares/createParameter';

export type TypeProps = 'WEIGHT' | 'DIMENSION' | 'TWO_CHOICES' | 'MANY_CHOICES' | 'OPEN_ENDED';
export type DataTypeProps = 'string' | 'number' | 'boolean';

export type ParameterProps = {
  data: ParameterResponseBody[];
};

const usePostParameter = (paramBody: ParameterResponseBody) => {
  const { data } = useQuery('parameter', async () => createParameter(paramBody));
  return data;
};

const CreateParameter = () => {
  const theme = useTheme();
  const { spacing } = theme;
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [parameterType, setParameterType] = useState('');
  const [dataType, setDataType] = useState('');
  const [active, setActive] = useState('');
  const [formData, setFormData] = useState<{
    paramBody: ParameterResponseBody;
  }>();
  const [types, setTypes] = useState<TypeProps>('MANY_CHOICES');
  const [data, setData] = useState<DataTypeProps>('string');


  // const postParameter = usePostParameter(formData, (data) => {
  //   if (data === false) return;
  // });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (newName.trim() === '') {
      setNameError('Please enter parameter name');
    } else if (/\d/.test(newName)) {
      setNameError('Name cannot contain numbers');
    } else {
      setNameError('');
    }
  };

  // const submitForm = (): boolean => {
  //   const paramBody: ParameterResponseBody = {
  //     name,
  //     displayName,
  //     type: types,
  //     dataType: data,
  //     active, 
  //   };

  //   // if (!validateForm()) return false;

  //   setFormData({
  //     paramBody,
  //   });
  //   return true;
  // };

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   submitForm();
  // };

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
        <Box
          sx={{
            // display: 'flex',
            // width: isLg ? '73%' : '100%',
          }}
        >
          <Grid
            item
            // onSubmit={handleSubmit}
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
                  // onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  {/* <OnLeaveModal open={openLeave} setOpen={setOpenLeave} /> */}
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
                  // onChange={handleNameChange}
                  // error={!!nameError}
                  // helperText={nameError}
                  sx={({ spacing }) => ({
                    mt: spacing(2),
                    width: '100%',
                  })}
                />

                <FormControl
                  sx={({ spacing }) => ({ mr: spacing(3), width: '100%', mt: spacing(2) })}
                >
                  <InputLabel>Parameter Type</InputLabel>
                  <Select
                    label="Parameter Type"
                    value={types}
                  //   onChange={handleContactChange}
                  >
                    <MenuItem value="WEIGHT">Weight</MenuItem>
                    <MenuItem value="DIMENSION">Dimension</MenuItem>
                    <MenuItem value="TWO_CHOICES">Two choices</MenuItem>
                    <MenuItem value="MANY_CHOICES">Many choices</MenuItem>
                    <MenuItem value="OPEN_ENDED">Open Ended</MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  sx={({ spacing }) => ({ mr: spacing(3), width: '100%', mt: spacing(2) })}
                >
                  <InputLabel>Data Type</InputLabel>
                  <Select
                    label="Contact"
                    value={dataType}
                  //   onChange={handleContactChange}
                  >
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
                    // onClick={handleSubmit}
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
                  // disabled={
                  //   name.trim() === '' ||
                  //   mobileNumber.trim() === '' ||
                  //   email.trim() === '' ||
                  //   bio.trim() === '' ||
                  // }
                  >
                    Confirm
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default CreateParameter;
