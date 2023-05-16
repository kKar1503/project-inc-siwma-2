import { ReactNode, useState, SyntheticEvent } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

const categoryPageData = [
  {
    id: '1',
    name: 'A',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '2',
    name: 'lorem ipsum',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '3',
    name: 'cmd + window',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '4',
    name: 'rshlck',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '5',
    name: 'cocint',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '6',
    name: 'huhu',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '7',
    name: 'gotoe',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
];

// export const getServerSideProps = async ({ query } : { query:any }) => {
//   // api call to get category names and images

//   const { id } = query;

//   const data = categoryPageData[id - 1];

//   return {
//     props: {
//       data,
//     },
//   };
// };

// const StyledTab = styled(Tab)(({ theme }) => {{

// }});

const CategoriesPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={() => ({
        width: '73%',
        height: 'full',
        bgcolor: theme.palette.common.white,
        borderRadius: theme.shape,
      })}
    >
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item sx={({ spacing }) => ({
          pt: spacing(3),
          pl: '160px',
          pr: '160px',
          pb: spacing(3),
        })}>
          <Grid container justifyContent="center">
            {categoryPageData.map(({ id, name, image }) => (
              <Grid key={id} item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia component="img" height="140" image={image} />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        marginRight="auto"
                        marginLeft="auto"
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
      </Grid>
    </Box>
  );
};

export default CategoriesPage;
