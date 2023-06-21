import CardActionArea from '@mui/material/CardActionArea';
import { useQuery } from 'react-query';
import { Box, Typography, CardMedia, CardContent, Card, Grid, useTheme } from '@mui/material';
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
  const catData = useCategoryPageQuery();

  const theme = useTheme();

  const placeholder = '/images/catPlaceholder.png';

  return (
    <Box
      sx={{
        mx: 'auto',
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
            py: spacing(3),
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
          }}
        >
          {catData?.map(({ id, name, image }) => (
            <Grid key={id} item xl={2} lg={3} md={4} sm={6} xs={12}>
              <Card>
                <CardActionArea>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* {image ? (
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
                    )} */}
                    <CardMedia
                      component="img"
                      sx={{
                        height: 'auto',
                        maxHeight: 250,
                        width: 'auto',
                        maxWidth: 250,
                      }}
                      image={image || placeholder}
                    />
                    
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
