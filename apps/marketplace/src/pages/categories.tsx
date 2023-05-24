import { Dispatch, SetStateAction, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';
import { useQuery } from 'react-query';
import categories, { CategoryResponseBody } from '@/utils/api/client/zod/categories';

// export interface Image {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   crossSectionImage: string;
//   active: boolean;
// }

export type CategoryPageTypes = {
  // data: Image[];
  data: CategoryResponseBody[]
};

const useCategoryPageQuery = (setCategoryData: Dispatch<SetStateAction<CategoryPageTypes>>) => {
  const { data } = useQuery('catData', async () => {
    const parsedCategoryList = categories.getAll.parse(data);

    setCategoryData({ data: parsedCategoryList });
    return parsedCategoryList;
  });
};

const categoryExamples: CategoryResponseBody[] = [
  {
    id: '1',
    name: 'Beams',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '2',
    name: 'Angles',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '3',
    name: 'Channels',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '4',
    name: 'Gratings',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '5',
    name: 'Hollo Sections',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '6',
    name: 'Plates',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '7',
    name: 'Purlins',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '8',
    name: 'Round Bar',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '9',
    name: 'Sheet Piles',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
  {
    id: '10',
    name: 'Square Bar',
    description: 'Description1',
    image:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
    active: true,
  },
];

const CategoriesPage = () => {
  const [categoryData, setCategoryData] = useState<CategoryPageTypes>({ data: [] });

  useCategoryPageQuery(setCategoryData);

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
          fontSize: {xs: 20, md:40, lg: 50, },
          fontWeight: 700,
        })}
      >
        More Metal Types
      </Typography>
      <Typography
        sx={({ spacing }) => ({
          pl: spacing(4),
          pt: spacing(1),
          fontSize: {xs: 12, md:24, lg:36, },
          fontWeight: 500,
        })}
        variant="h5"
      >
        Choose from over 8,000 types of shapes and grades of metals!
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
          {categoryExamples.map(({ id, name, image }) => (
            <Grid key={id} item>
              <Card>
                <CardActionArea>
                  <CardMedia component="img" height="140" image={image} />
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
