import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export type SetListingProps = {
  setTitle: (title: string) => void;
  setPrice: (price: number) => void;
  setNegotiable: (negotiable: boolean) => void;
  setUnitPrice: (unitPrice: boolean) => void;
  setDescription: (description: string) => void;
};

const ListingForm = ({
  setTitle,
  setPrice,
  setNegotiable,
  setUnitPrice,
  setDescription,
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
        fullWidth
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
    </Grid>

    <Grid item xs={12} md={12} sx={{ width: '100%' }}>
      <OutlinedInput
        className="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">S$</InputAdornment>}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPrice(parseFloat(e.target.value));
        }}
      />
    </Grid>

    <Grid item xs={12} md={12} sx={{ width: '100%' }}>
      <FormControlLabel
        value="negotiable"
        control={
          <Checkbox
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(e.target.value);
        }}
      />
    </Grid>
  </>
);

export default ListingForm;
