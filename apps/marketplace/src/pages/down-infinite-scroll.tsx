import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { useQuery } from 'react-query';
import { InfiniteScroll } from '@inc/ui';

interface IStuff {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
}

const InfiniteScrollingPage = () => {
  const [stuff, setStuff] = useState<IStuff[]>([]);

  const { isLoading, isFetching, refetch } = useQuery(
    'chat',
    async () =>
      fetch(`https://randomuser.me/api/?results=10&inc=name,email`).then((res) => res.json()),
    {
      onSuccess: (data) => {
        setStuff((prev) => [...prev, ...data.results]);
      },
    }
  );

  return (
    <>
      <Button
        type="button"
        variant="contained"
        sx={{
          height: '60px',
          width: '60px',
          position: 'fixed',
          borderRadius: '100%',
          right: '15px',
          bottom: '15px',
        }}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        <ArrowUpward sx={{ height: '30px', width: '30px' }} />
      </Button>
      <Box sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <InfiniteScroll
          parent={Box}
          child={Box}
          onLoadMore={refetch}
          loading={isLoading}
          fetching={isFetching}
          loadingComponent={<Typography>Loading...</Typography>}
          endMessage={<Typography>End of List</Typography>}
          reachedMaxItems={false}
        >
          {stuff.map((aStuff, index) => (
            <Card key={`${aStuff.name.title}-${aStuff.name.first}-${aStuff.name.last}`}>
              <CardContent>
                <Typography variant="h4" component="div">
                  {index + 1}: {aStuff.name.title} {aStuff.name.first} {aStuff.name.last}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {aStuff.email}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default InfiniteScrollingPage;
