import React, { HTMLInputTypeAttribute } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';


const Field = ({ type, label, ...props }: { type: HTMLInputTypeAttribute; label: string; }) => (
  <label>
    <Grid item xs={12} md={6}>
      {label}
    </Grid>
    <Grid item xs={12} md={6}>
      <input type={type} placeholder={label.toLowerCase()} {...props} />
    </Grid>
  </label>);


const CompanyForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: FieldValues) => {
    console.log('valid');
    console.log(data);
  };
  const onInvalid = (data: FieldValues) => {
    console.log('invalid');
    console.log(data);
  };

  const startingDate = watch('startDate');
  const endingDate = watch('endDate');

  const validateDate = () => startingDate && endingDate && new Date(startingDate) > new Date(endingDate);

  return (
    <ModuleBase>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field label='Company' type='text' {...register('company', {})} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field label='Description' type='text' {...register('description', {})} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field label='Image' type='file' {...register('image', {})} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field label='Link' type='url' {...register('link', {})} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field label='Active' type='checkbox' {...register('active', {})} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field label='Starting Date' type='datetime-local' {...register('startDate', { validate: validateDate })} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field label='Ending Date' type='datetime-local' {...register('endDate', { validate: validateDate })} />
          </Grid>
        </Grid>
        <input type='submit' />
      </form>
    </ModuleBase>
  );
};

export default CompanyForm;
