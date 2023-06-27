import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';

export interface ListingValidationProps {
  nameError: string;
  descriptionError: string;
  priceError: string;
}

export type SetListingProps = {
  title?: string;
  price?: number;
  negotiable?: boolean;
  unitPrice?: boolean;
  description?: string;
  setTitle: (title: string) => void;
  setPrice: (price: number) => void;
  setNegotiable: (negotiable: boolean) => void;
  setUnitPrice: (unitPrice: boolean) => void;
  setDescription: (description: string) => void;
  errors: ListingValidationProps;
};

const ListingForm = ({
  title,
  price,
  negotiable,
  unitPrice,
  description,
  setTitle,
  setPrice,
  setNegotiable,
  setUnitPrice,
  setDescription,
  errors,
}: SetListingProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {t('General Information')}
        </Typography>
        <Typography variant="body1">{t('Enter the details of the listing below')}</Typography>
      </Grid>
      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <TextField
          size="medium"
          variant="outlined"
          label={t('Listing Title')}
          value={title}
          error={Boolean(errors.nameError)}
          helperText={errors.nameError}
          fullWidth
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Grid>

      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <TextField
          className="outlined-adornment-amount"
          value={price}
          fullWidth
          error={Boolean(errors.priceError)}
          helperText={errors.priceError}
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">S$</InputAdornment>,
          }}
          onChange={(e) => {
            setPrice(parseFloat(e.target.value));
          }}
        />
      </Grid>

      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <FormControlLabel
          value="negotiable"
          control={
            <Checkbox
              checked={negotiable}
              onChange={(e) => {
                setNegotiable(e.target.checked);
              }}
            />
          }
          label={t('Negotiable?')}
        />
        <FormControlLabel
          value="unitPrice"
          control={
            <Checkbox
              checked={unitPrice}
              onChange={(e) => {
                setUnitPrice(e.target.checked);
              }}
            />
          }
          label={t('Price per unit?')}
        />
      </Grid>

      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <TextField
          rows={6}
          variant="outlined"
          label={t('Listing Description')}
          value={description}
          fullWidth
          multiline
          error={Boolean(errors.descriptionError)}
          helperText={errors.descriptionError}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Grid>
    </>
  );
};

export default ListingForm;
