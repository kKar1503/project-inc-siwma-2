import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';
import { useQuery } from 'react-query';
import { CategoryResponseBody } from '@/utils/api/client/zod/categories';
import fetchCats from '@/middlewares/fetchCat';

export type CategoryPageType = {
  data: CategoryResponseBody[];
};

const useCategoryPageQuery = () => {
  const { data } = useQuery('cat', async () => fetchCats());
  return data;
};

const CategoriesPage = () => {
  const catData = useCategoryPageQuery()

  return (
    <Box
      sx={{
        width: '80%',
        height: 'full',
        mr: 'auto',
        ml: 'auto',
        maxHeight: 'xl',
      }}
    >
      <Typography
        sx={({ spacing }) => ({
          pl: spacing(4),
          pt: spacing(3),
          fontSize: { xs: 20, md: 40, lg: 50 },
          fontWeight: 700,
        })}
      >
        More Metal Types
      </Typography>
      <Grid
        sx={({ spacing }) => ({
          py: spacing(4),
        })}
      >
        <Grid
          container
          columnSpacing={3}
          rowSpacing={3}
          sx={{
            direction: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {catData?.map(({ id, name, image }) => (
            <Grid key={id} item>
              <Card sx={{ }}>
                <CardActionArea>
                  <CardMedia component="img" height="140" width="140" image={image} />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoriesPage;
