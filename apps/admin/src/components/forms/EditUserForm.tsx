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
import editUser from '@/middlewares/editUser';
import forgetPW from '@/middlewares/forget-password';
import { useMutation } from 'react-query';
import { validateEmail, validateName, validatePassword, validatePhone } from '@/utils/api/validate';

type EditUserFormProps = {
  user: User | undefined;
  companies: Company[];
  openModal: (modal: string) => void;
};

type TextInputProps = {
  label: string;
  placeholder: string;
  multiline?: boolean;
  register: UseFormRegister<FieldValues>;
  field: string;
  onClick?: () => void;
};

type SelectInputProps = {
  placeholder: string;
  label: string;
  data: Company[];
  register: UseFormRegister<FieldValues>;
  field: string;
};

const useForgetPasswordMutation = (successFn: () => void) =>
  useMutation('sendEmail', forgetPW, {
    onSuccess: successFn,
  });

const useEditUserMutation = (uuid: string, file: File | undefined, successFn?: () => void) =>
  useMutation((updatedUserData: PutUserRequestBody) => editUser(updatedUserData, uuid, file), {
    onSuccess: successFn,
  });

const TextInput = ({ label, placeholder, multiline, register, field, onClick }: TextInputProps) => (
  <FormControl
    sx={{
      paddingRight: 2,
      width: '100%',
    }}
  >
    <Typography variant="body1">
      {label}
      {placeholder === 'Password' && (
        <button
          style={{
            display: 'inline',
            background: 'none',
            border: 'none',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={onClick}
        >
          Send Email
        </button>
      )}
    </Typography>

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

const EditUserForm = ({ user, companies, openModal }: EditUserFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isXs, isSm, isMd] = useResponsiveness(['xs', 'sm', 'md']);

  const { register, handleSubmit, reset } = useForm();

  // fill form
  useEffect(() => {
    if (user) {
      const formData = {
        name: user.name,
        email: user.email,
        company: user.company,
        mobileNumber: user.mobileNumber,
        bio: user.bio || undefined,
        userComments: user.comments || undefined,
      };
      reset(formData);
      setProfilePic(user.profilePic);
    }
  }, [reset, user]);

  const editUserMutation = useEditUserMutation(user?.id as string, file || undefined, () =>
    openModal('success')
  );
  const passwordResetMutation = useForgetPasswordMutation(() => openModal('email'));

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

  const sendPasswordResetEmail = () => {
    if (user) passwordResetMutation.mutate(user.email);
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
    try {
      // validations
      if (data.name !== undefined) validateName(data.name);
      if (data.email) validateEmail(data.email);
      if (data.mobileNumber) validatePhone(data.mobileNumber);
      if (data.password) {
        if (data.password !== data.oldPassword) throw new Error('Passwords do not match.');
        validatePassword(data.password);
      }

      setError(null);
      const companyId = companies.find((element) => element.name === data.company)?.id;
      const newUserData = {
        name: data.name,
        email: data.email,
        company: companyId,
        mobileNumber: data.mobileNumber,
        bio: data.bio || undefined,
        password: data.password || undefined,
        userComments: data.userComments || undefined,
      };
      editUserMutation.mutate(newUserData);
    } catch (error: unknown) {
      if (error instanceof Error) setError(error);
    }
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
                          : `https://siwma-marketplace.s3.ap-southeast-1.amazonaws.com/${profilePic}`
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
                field="password"
                onClick={sendPasswordResetEmail}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                label="Confrim Password"
                placeholder="Confirm Password"
                register={register}
                field="oldPassword"
                // Instead of confirm password, oldPassword is used. That is because
                // oldPassword is not used by admin and confirmPassword doesn't exits on PUT user request body.
                // And I also don't want to create a new type
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
            <Grid item xs={12}>
              {error && <Typography color="red">{error.message}</Typography>}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} marginTop={4}>
          <Grid container>
            <Grid item md={2}>
              {!(isXs || isSm) && (
                <Button variant="contained" onClick={() => openModal('warning')}>
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
