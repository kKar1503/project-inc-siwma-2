import {
  FormControl,
  OutlinedInput,
  Grid,
  Box,
  IconButton,
  Typography,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FiImage, FiUpload } from 'react-icons/fi';
import Image from 'next/image';
import { Company } from '@/utils/api/client/zod/companies';
import { useResponsiveness } from '@inc/ui';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useQuery, useMutation } from 'react-query';
import fetchCompanies from '@/middlewares/fetchCompanies';

type TextInputProps = {
  label: string;
  placeholder: string;
  multiline?: boolean;
};

type SelectInputProps = {
  label: string;
  data: Company[];
};

const TextInput = ({ label, placeholder, multiline }: TextInputProps) => (
  <FormControl
    sx={{
      paddingRight: 2,
      width: '100%',
    }}
  >
    <Typography variant="body1">{label}</Typography>
    <OutlinedInput
      fullWidth
      multiline={multiline || false}
      minRows={multiline ? 3 : 0}
      placeholder={placeholder}
      sx={{
        marginTop: 1,
      }}
      size="small"
    />
  </FormControl>
);

const SelectInput = ({ label, data }: SelectInputProps) => (
  <FormControl
    sx={{
      paddingRight: 2,
      width: '100%',
    }}
  >
    <Typography variant="body1">{label}</Typography>
    <Select
      value={data.length !== 0 ? data[0].id : 0}
      size="small"
      sx={{
        marginTop: 1,
      }}
      inputProps={{ 'aria-label': 'Without label' }}
    >
      {data.map((company) => (
        <MenuItem value={company.id} key={company.id}>
          {company.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const EditUserForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isXs, isSm, isMd] = useResponsiveness(['xs', 'sm', 'md']);

  const { data: companies } = useQuery('getCompanies', fetchCompanies);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    if (event.target.files.length === 1) {
      setFile(event.target.files[0]);
    } else if (event.target.files.length > 1) {
      setFile(null);
      alert('Please Select Only One Picture');

      return;
    } else {
      setFile(null);
      alert('Please Select a Picture');

      return;
    }

    if (event.target.files[0].size > 10000000) {
      setFile(null);
      alert('Please Select a File Smaller Than 10 MB');
    }
  };

  return (
    <Grid container>
      <Grid item sm={12} md={4}>
        <Typography variant="body1">Profile Picture (Optional)</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isSm ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isSm ? 'normal' : 'center',
            height: '100%',
          }}
        >
          <Box
            sx={{
              width: isXs || isSm ? '80px' : '100%',
              border: '1px solid primary.main',
              borderStyle: 'dotted',
              height: isXs || isSm ? '80px' : '100%',
              marginTop: 1,
              marginRight: 2,
            }}
          >
            <label
              htmlFor="profile"
              style={{
                cursor: 'pointer',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {file === null || !file.type.startsWith('image/') ? (
                  <IconButton component="span">
                    {file === null ? <FiUpload color="black" /> : <FiImage />}
                  </IconButton>
                ) : (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    style={{
                      objectFit: 'contain',
                      display: 'block',
                      height: '100%',
                      width: '100%',
                      margin: 'auto',
                    }}
                    width={10}
                    height={10}
                  />
                )}
              </Box>
              {!(isXs || isSm) && (
                <Typography variant="body1" textAlign="center">
                  {file != null
                    ? file.name
                    : 'Click to upload or drag and drop SVG, PNG or JPG (MAX. 800 x 400px)'}
                </Typography>
              )}
            </label>
            <input
              id="profile"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </Box>
          {(isXs || isSm) && (
            <Button
              sx={{
                width: '140px',
              }}
              variant="contained"
              color="error"
            >
              Delete Image
            </Button>
          )}
        </Box>
      </Grid>

      <Grid item sm={12} md={8}>
        <Grid container marginTop={isXs || isSm ? 4 : 0} rowGap={2}>
          <Grid item xs={12} sm={6}>
            <SelectInput label="Companies" data={companies || []} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="Fullname" placeholder="Fullname" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="E-mail" placeholder="E-mail" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="Mobile Number" placeholder="Mobile Number" />
          </Grid>
          <Grid item xs={12}>
            <TextInput label="Bio (optional)" placeholder="Bio" multiline />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="Change Password" placeholder="Password" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="Change Password" placeholder="New Password" />
          </Grid>
          <Grid item xs={12}>
            <TextInput label="Comments (optional)" placeholder="Comment" multiline />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} marginTop={4}>
        <Grid container>
          <Grid item md={2}>
            {!(isXs || isSm) && <Button variant="contained">Go Back</Button>}
          </Grid>
          <Grid item md={2}>
            {!(isXs || isSm) && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  marginRight: 2,
                }}
              >
                <Button variant="contained" color="error">
                  Delete Image
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <Button fullWidth={isXs || isSm} variant="contained">
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditUserForm;
