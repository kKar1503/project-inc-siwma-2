import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import { useQuery } from 'react-query';
import { useTheme } from '@mui/material';
import { CategoryResponseBody } from '@/utils/api/client/zod/categories';
import fetchCats from '@/middlewares/fetchCat';
import CatImgsPlaceholder from '@/components/marketplace/category/CarouselImgsPlaceholder';

export type CategoryPageType = {
  data: CategoryResponseBody[];
};

const useCategoryPageQuery = () => {
  const { data } = useQuery('cat', async () => fetchCats());
  return data;
};

const CategoriesPage = () => {
  const catData = useCategoryPageQuery();

  const theme = useTheme();

  return (
    <Box
      sx={{
        mr: 'auto',
        ml: 'auto',
        width: '90%',
        height: 'full',
        maxHeight: 'xl',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography
          sx={({ spacing }) => ({
            pt: spacing(3),
            pb: spacing(3),
            fontSize: { xs: 20, sm: 30, md: 40, lg: 45 },
            fontWeight: 700,
          })}
        >
          More Metal Types
        </Typography>
      </Box>

      <Grid>
        <Grid
          container
          spacing={3}
          sx={{
            direction: 'row',
            alignItems: 'center',
            // justifyContent: 'center',
          }}
        >
          {catData?.map(({ id, name, image }) => (
            <Grid key={id} item xl={2} lg={3} md={4} sm={6} xs={12}>
              <Card>
                <CardActionArea>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {image ? (
                      <CardMedia
                      component="img"
                      sx={{
                        height: 'auto',
                        maxHeight: 250,
                        width: 'auto',
                        maxWidth: 250,
                      }}
                      image={image}
                    />
                    ) : (
                      <CatImgsPlaceholder />
                    )}
                    
                  </div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body1"
                      sx={{
                        fontWeight: theme.typography.h6,
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
