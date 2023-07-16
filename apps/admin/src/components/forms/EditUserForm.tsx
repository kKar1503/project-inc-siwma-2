import {
  FormControl,
  OutlinedInput,
  Grid,
  Box,
  IconButton,
  Typography,
  Button,
  Autocomplete,
  TextField,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { FiImage, FiUpload } from 'react-icons/fi';
import Image from 'next/image';
import { Company } from '@/utils/api/client/zod/companies';
import { useResponsiveness } from '@inc/ui';
import { useForm, SubmitHandler, FieldValues, UseFormRegister } from 'react-hook-form';
import { PutUserRequestBody } from '@/utils/api/server/zod/users';
import { User } from '@/utils/api/client/zod/users';

type EditUserFormProps = {
  user: User | undefined;
  companies: Company[];
  returnFn: () => void;
};

type TextInputProps = {
  label: string;
  placeholder: string;
  multiline?: boolean;
  register: UseFormRegister<FieldValues>;
  field: string;
};

type SelectInputProps = {
  placeholder: string;
  label: string;
  data: Company[];
  register: UseFormRegister<FieldValues>;
  field: string;
};

const TextInput = ({ label, placeholder, multiline, register, field }: TextInputProps) => (
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
      {...register(field)}
    />
  </FormControl>
);

const SelectInput = ({ label, data, placeholder, register, field }: SelectInputProps) => (
  <FormControl
    sx={{
      paddingRight: 2,
      width: '100%',
    }}
  >
    <Typography variant="body1">{label}</Typography>
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          placeholder={placeholder}
          sx={{
            marginTop: 1,
          }}
          size="small"
          {...register(field)}
        />
      )}
    />
  </FormControl>
);

const EditUserForm = ({ user, companies, returnFn }: EditUserFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isXs, isSm, isMd] = useResponsiveness(['xs', 'sm', 'md']);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset(user);
      setProfilePic(user.profilePic);
    }
  }, [reset, user]);

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

  const deleteImage = () => {
    if (file) {
      setFile(null);
      return;
    }
    if (profilePic) {
      setProfilePic(null);
    }
  };

  const onSubmit: SubmitHandler<PutUserRequestBody> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                  {file === null && profilePic === null ? (
                    <IconButton component="span">
                      {file === null ? <FiUpload color="black" /> : <FiImage />}
                    </IconButton>
                  ) : (
                    <Image
                      src={
                        file !== null
                          ? URL.createObjectURL(file)
                          : `https://s3.karlok.dev/${profilePic}`
                      }
                      alt="preview"
                      style={{
                        objectFit: 'contain',
                        display: 'block',
                        height: '100%',
                        width: '100%',
                        margin: 'auto',
                      }}
                      width={300}
                      height={300}
                    />
                  )}
                </Box>
                {!(isXs || isSm) && (
                  <Typography variant="body1" textAlign="center">
                    {file === null && profilePic === null
                      ? 'Click to upload or drag and drop SVG, PNG or JPG (MAX. 800 x 400px)'
                      : file?.name || profilePic}
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
                onClick={deleteImage}
              >
                Delete Image
              </Button>
            )}
          </Box>
        </Grid>

        <Grid item sm={12} md={8}>
          <Grid container marginTop={isXs || isSm ? 4 : 0} rowGap={2}>
            <Grid item xs={12} sm={6}>
              <SelectInput
                placeholder="Company"
                label="Companies"
                data={companies || []}
                register={register}
                field="company"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput label="Fullname" placeholder="Fullname" register={register} field="name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput label="E-mail" placeholder="E-mail" register={register} field="email" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                label="Mobile Number"
                placeholder="Mobile Number"
                register={register}
                field="mobileNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                label="Bio (optional)"
                placeholder="Bio"
                multiline
                register={register}
                field="bio"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                label="Change Password"
                placeholder="Password"
                register={register}
                field="oldPassword"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                label="Change Password"
                placeholder="New Password"
                register={register}
                field="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                label="Comments (optional)"
                placeholder="Comment"
                multiline
                register={register}
                field="userComments"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} marginTop={4}>
          <Grid container>
            <Grid item md={2}>
              {!(isXs || isSm) && (
                <Button variant="contained" onClick={returnFn}>
                  Go Back
                </Button>
              )}
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
                  <Button variant="contained" color="error" onClick={deleteImage}>
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
                <Button type="submit" fullWidth={isXs || isSm} variant="contained">
                  Save Changes
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditUserForm;
