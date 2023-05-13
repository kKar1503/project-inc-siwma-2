import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const CreateListingPage = () => (
  <Container>
    <Grid
      container
      spacing={2}
      boxShadow={5}
      alignContent="center"
      display="flex"
      position="relative"
      padding="1rem"
      margin="1rem"
    >
      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Create Listing
        </Typography>
      </Grid>
      <Grid item xs={10} md={10} justifyContent="flex-start" sx={{ width: '100%' }}>
        <Typography variant="body1">
          Create a buy or a sell listing to be shared on your profile.
        </Typography>
      </Grid>
      <Grid item xs={2} md={2} justifyContent="flex-end" sx={{ width: '100%' }}>
        <Button variant="contained" type="submit">
          Cancel Listing
        </Button>
      </Grid>
      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <Divider sx={{ my: 2 }} />
      </Grid>

      <Grid item xs={12} md={12} sx={{ width: '100%', my: 2 }}>
        <RadioGroup row>
          <Grid item xs={6} md={6} sx={{ width: '100%', pr: 1 }}>
            <Button size="large" variant="outlined" fullWidth>
              BUYING
            </Button>
          </Grid>
          <Grid item xs={6} md={6} sx={{ width: '100%', pl: 1 }}>
            <Button size="large" variant="outlined" fullWidth>
              SELLING
            </Button>
          </Grid>
        </RadioGroup>
        <Divider sx={{ my: 2 }} />
      </Grid>

      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <Select size="medium" label="Select a category..." fullWidth>
          <MenuItem value="1">Something</MenuItem>
        </Select>
        <Divider sx={{ my: 2 }} />
      </Grid>

      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Select Photos
        </Typography>
        <Typography variant="body1">Choose images to display for the listing</Typography>
        <Button variant="contained" sx={{ mt: '1rem' }}>
          UPLOAD A PHOTO
        </Button>
        <Divider sx={{ my: 2 }} />
      </Grid>

      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Category Parameters
        </Typography>
        <Typography variant="body1">
          Enter the parameters specific to the chosen category
        </Typography>

        <Button variant="contained" sx={{ mt: '1rem' }}>
          UPLOAD A PHOTO
        </Button>
        <Divider sx={{ my: 2 }} />
      </Grid>

      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          General Information
        </Typography>
        <Typography variant="body1">Enter the details of the listing below</Typography>
      </Grid>
      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <TextField size="medium" variant="outlined" label="Listing Title" fullWidth />
      </Grid>

      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">S$</InputAdornment>}
        />
      </Grid>

      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <FormControlLabel value="negotiable" control={<Checkbox />} label="Negotiable?" />
        <FormControlLabel value="unitPrice" control={<Checkbox />} label="Price per unit?" />
      </Grid>

      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <TextField rows={6} variant="outlined" label="Listing Description" fullWidth multiline />
      </Grid>

      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <Button variant="contained" type="submit" fullWidth sx={{ mt: '1rem' }}>
          CREATE LISTING
        </Button>
      </Grid>
    </Grid>
  </Container>
);

export default CreateListingPage;
