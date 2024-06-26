import { Grid, Box, IconButton, Typography, Button } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { FiImage, FiUpload } from 'react-icons/fi';
import Image from 'next/image';
import { Company } from '@/utils/api/client/zod/companies';
import { useResponsiveness } from '@inc/ui';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { PutUserRequestBody } from '@/utils/api/server/zod/users';
import { User } from '@/utils/api/client/zod/users';
import editUser from '@/middlewares/editUser';
import forgetPW from '@/middlewares/forget-password';
import { useMutation } from 'react-query';
import { validateEmail, validateName, validatePassword, validatePhone } from '@/utils/api/validate';
import { FormInputGroup, FormSearchDropdown, FormTextInput } from '@/components/forms';

type EditUserFormProps = {
  user: User | undefined;
  companies: Company[];
  openModal: (modal: string) => void;
};

type Inputs = {
  company: { label: string; value: string };
  name: string | undefined;
  email: string | undefined;
  mobileNumber: string | undefined;
  bio: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  userComments: string | undefined;
};

const onErrorFn = (error: any) => {
  alert(error.statusText);
};

const useForgetPasswordMutation = (successFn: () => void) =>
  useMutation('sendEmail', forgetPW, {
    onSuccess: successFn,
    onError: onErrorFn,
  });

const useEditUserMutation = (uuid: string, file: File | undefined, successFn?: () => void) =>
  useMutation((updatedUserData: PutUserRequestBody) => editUser(updatedUserData, uuid, file), {
    onSuccess: successFn,
    onError: onErrorFn,
  });

const parseOptions = (data: Company[]) =>
  data.map((company) => ({ label: company.name, value: company.id }));

const EditUserForm = ({ user, companies, openModal }: EditUserFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isXs, isSm, isMd] = useResponsiveness(['xs', 'sm', 'md']);

  const obtainDefaultValues = () => {
    if (!user) return undefined;
    return {
      name: user.name,
      email: user.email,
      company: { label: user.company.name, value: user.company.id },
      mobileNumber: user.mobileNumber,
      bio: user.bio || undefined,
      password: undefined,
      confirmPassword: undefined,
      userComments: user.comments || undefined,
    };
  };

  const formHook = useForm({
    defaultValues: obtainDefaultValues(),
  });
  const { handleSubmit, reset } = formHook;

  // fill form
  useEffect(() => {
    if (user) {
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      // validations
      if (data.name !== undefined) validateName(data.name);
      if (data.email) validateEmail(data.email);
      if (data.mobileNumber) validatePhone(data.mobileNumber);
      if (data.password) {
        if (data.password !== data.confirmPassword) throw new Error('Passwords do not match.');
        validatePassword(data.password);
      }
      if (!data.company) throw new Error('Company cannot be empty');

      setError(null);
      const newUserData = {
        name: data.name,
        email: data.email,
        company: data.company.value,
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
      <FormProvider {...formHook}>
        <Grid container marginTop={2}>
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
                        width={400}
                        height={400}
                      />
                    )}
                  </Box>
                  {!(isXs || isSm) && (
                    <Typography variant="subtitle1" textAlign="center">
                      {file === null && profilePic === null
                        ? 'Click to upload or drag and drop SVG, PNG or JPG (MAX. 800 x 400px)'
                        : file?.name}
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
            <Grid container marginTop={isXs || isSm ? 4 : 0}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Company</Typography>
                <FormInputGroup
                  sx={{ width: isXs || isSm ? '100%' : '95%' }}
                  label=""
                  name="company"
                >
                  <FormSearchDropdown
                    options={parseOptions(companies)}
                    label=""
                    name="company"
                    placeholder="Company"
                  />
                </FormInputGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Fullname</Typography>
                <FormInputGroup label="" name="name">
                  <FormTextInput label="" name="name" placeholder="Name" />
                </FormInputGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Email</Typography>
                <FormInputGroup sx={{ width: isXs || isSm ? '100%' : '95%' }} label="" name="email">
                  <FormTextInput label="" name="email" placeholder="Email" />
                </FormInputGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Mobile Number</Typography>
                <FormInputGroup label="" name="mobileNumber">
                  <FormTextInput label="" name="mobileNumber" placeholder="Mobile Number" />
                </FormInputGroup>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Bio (Optional)</Typography>
                <FormInputGroup label="" name="bio">
                  <FormTextInput label="" name="bio" multiline placeholder="Bio" />
                </FormInputGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography display="inline-block" variant="body1">
                  Change Password
                </Typography>
                <button
                  type="button"
                  style={{
                    display: 'inline',
                    background: 'none',
                    border: 'none',
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={sendPasswordResetEmail}
                >
                  SEND EMAIL
                </button>
                <FormInputGroup
                  sx={{ width: isXs || isSm ? '100%' : '95%' }}
                  label=""
                  name="password"
                >
                  <FormTextInput label="" name="password" placeholder="Password" />
                </FormInputGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Confirm Password</Typography>
                <FormInputGroup label="" name="confirmPassword">
                  <FormTextInput label="" name="confirmPassword" placeholder="Confirm Password" />
                </FormInputGroup>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Comments (Optional)</Typography>
                <FormInputGroup label="" name="userComments">
                  <FormTextInput label="" name="userComments" multiline placeholder="Comments" />
                </FormInputGroup>
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
      </FormProvider>
    </form>
  );
};

export default EditUserForm;
