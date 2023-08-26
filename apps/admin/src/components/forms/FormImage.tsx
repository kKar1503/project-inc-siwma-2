/* eslint-disable @typescript-eslint/ban-ts-comment */
import Autocomplete from '@mui/material/Autocomplete';
import Skeleton from '@mui/material/Skeleton';
import { Controller, FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import S3CardImage from '@/components/S3CardImage';
import { IconButton } from '@mui/material';
import { FiUpload } from 'react-icons/fi';
import React from 'react';

type ImageType = {
  type: 'file';
  file: File;
} | {
  type: 'S3';
  s3Src: string;
} | {
  type: null;
};

interface FormImageProps {
  name: string;
  label: string;
  // We do not know what the shape of the object will be
  // eslint-disable-next-line react/forbid-prop-types
  customValidation?: RegisterOptions<FieldValues, string> | undefined;
  required?: boolean;
  success?: boolean;
  resetFlag?: string;
  isLoading?: boolean;
  sx?: React.ComponentProps<typeof Autocomplete>['sx'];
}

/**
 * Wrapper component for a react hook form input
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A input that works with react form hook
 */
const FormImage = ({
                     name,
                     label,
                     customValidation,
                     required = false,
                     success,
                     resetFlag,
                     isLoading,
                     sx,
                   }: FormImageProps) => {
  // Use form context
  const {
    register,
    formState: { errors, defaultValues },
    control,
  } = useFormContext();

  // Hooks inputs to using react form hook
  const hookInput = (
    inputName: string,
    inputLabel: string,
    options: Parameters<typeof register>['1'],
  ) =>
    register(inputName, {
      required: { value: required, message: `${inputLabel} is required` },
      ...options,
    });

  // Determine the border color
  // eslint-disable-next-line no-nested-ternary
  const borderColor = errors[name] ? 'error.main' : success ? 'success.main' : undefined;

  const { onChange, ...hook } = hookInput(name, label, customValidation);
  return (
    // Render a skeleton if the component is in a loading state
    isLoading ? (
      <Skeleton height='18.25rem' />
    ) : (
      <Controller
        name={name}
        control={control}
        key={resetFlag}
        render={({ field: { ref, onChange,value ,...field }, formState: { defaultValues } }) => {
          const image: ImageType = (() => {
            if (defaultValues === undefined) return { type: null };

            const image = value || defaultValues[name];
            if (image === undefined) return { type: null };
            if (typeof image === 'string' && image !== '') return { type: 'S3', s3Src: image as string };
            if (typeof image === 'object' && image !== null) return { type: 'file', file: image as File };

            return { type: null };
          })();

          return (
            <Box
              style={{
                backgroundColor: errors[name] ? '#f8eaea' : undefined,
                color: success ? 'success' : undefined,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  '.MuiOutlinedInput-root': {
                    '& > fieldset': { borderColor },
                  },
                  '&.Mui-focused .MuiOutlinedInput-root': {
                    '& > fieldset': { borderColor },
                  },
                  '&:hover .MuiOutlinedInput-root': {
                    '& > fieldset': { borderColor },
                  },
                  '& label, & label.Mui-focused': {
                    color: borderColor,
                  },
                  ...sx,
                }}
              >

                <Typography variant='body1'>{label}</Typography>
                <Box
                  sx={{
                    width: '100%',
                    border: '1px solid primary.main',
                    borderStyle: 'dotted',
                    height: '100%',
                    marginTop: 1,
                    marginRight: 2,
                  }}
                >
                  <label
                    htmlFor='image'
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
                      {/* eslint-disable-next-line no-nested-ternary */}
                      {image.type === 'file'
                        ? <Box component='img' src={URL.createObjectURL(image.file)} />
                        : image.type === 'S3'
                          ? <S3CardImage src={image.s3Src} allowClickThrough height='90%' />
                          : (<IconButton component='span'> <FiUpload color='black' /> </IconButton>)

                      }
                    </Box>
                    <Typography variant='subtitle1' textAlign='center'>
                      {image.type === 'file'
                        ? image.file?.name
                        : 'Click to upload or drag and drop SVG, PNG or JPG (MAX. 800 x 400px)'}
                    </Typography>
                  </label>
                  <input
                    id='image'
                    type='file'
                    style={{ display: 'none' }}
                    accept='image/*'
                    onChange={(e) => {
                      if (e.target.files !== null) {
                        onChange(e.target.files[0]);
                      }
                      // onChange(e);
                    }}
                  />
                </Box>
              </Box>
            </Box>
          );
        }}
      />
    )
  );
};

export default FormImage;
