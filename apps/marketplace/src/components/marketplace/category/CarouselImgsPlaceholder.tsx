import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CatImgsPlaceholder = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: '2em', height: 250 }}>
    <Typography variant='h1' sx={{fontSize: '32px', color: 'red', textTransform: 'uppercase'}}>No Image available</Typography>
  </Box>
);

export default CatImgsPlaceholder;