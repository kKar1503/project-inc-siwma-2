import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export interface ListingValidationProps {
  nameError: string;
  descriptionError: string;
  priceError: string;
}

export type SetListingProps = {
  setTitle: (title: string) => void;
  setPrice: (price: number) => void;
  setNegotiable: (negotiable: boolean) => void;
  setUnitPrice: (unitPrice: boolean) => void;
  setDescription: (description: string) => void;
  errors: ListingValidationProps;
};

const ListingForm = ({
  setTitle,
  setPrice,
  setNegotiable,
  setUnitPrice,
  setDescription,
  errors,
}: SetListingProps) => (
  <>
    <Grid item xs={12} md={12} sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        General Information
      </Typography>
      <Typography variant="body1">Enter the details of the listing below</Typography>
    </Grid>
    <Grid item xs={12} md={12} sx={{ width: '100%' }}>
      <TextField
        size="medium"
        variant="outlined"
        label="Listing Title"
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
            onChange={(e) => {
              setNegotiable(e.target.checked);
            }}
          />
        }
        label="Negotiable?"
      />
      <FormControlLabel
        value="unitPrice"
        control={
          <Checkbox
            onChange={(e) => {
              setUnitPrice(e.target.checked);
            }}
          />
        }
        label="Price per unit?"
      />
    </Grid>

    <Grid item xs={12} md={12} sx={{ width: '100%' }}>
      <TextField
        rows={6}
        variant="outlined"
        label="Listing Description"
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

export default ListingForm;
