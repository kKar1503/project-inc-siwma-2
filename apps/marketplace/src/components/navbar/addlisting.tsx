import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AddListing() {

  return (
    <Button variant="contained" size='small' sx={{backgroundColor: '#2962FF'}}>
      <Typography
        noWrap
        fontSize={10}
        color={'#FFFFF'}
      >
        ADD LISTINGS
      </Typography>
    </Button>

  )
}