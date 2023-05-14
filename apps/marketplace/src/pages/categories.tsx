import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import useTheme from '@mui/material/styles';

export type CategoriesProps = {
  id: string;
  name: string;
  img: string;
  crossSectionImage: string;
  active: string;
};

const CategoriesPage = ({ name, img }: CategoriesProps) => {
  const theme = useTheme;

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          {/* replace with an obj with all cats instead */}
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div' marginRight='auto' marginLeft='auto'>
                      {/* name here */}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CategoriesPage;
