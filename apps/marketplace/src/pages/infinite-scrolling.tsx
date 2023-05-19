import { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { useQuery } from 'react-query';
import { InfiniteScroll } from '@inc/ui';

interface ITodos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const InfiniteScrollingPage = () => {
  const [todos, setTodos] = useState<ITodos[]>([]);

  const scrollRef = useRef<Element>(null);

  const { isLoading, refetch } = useQuery(
    'chat',
    async () =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${todos.length + 1}`).then((res) =>
        res.json()
      ),
    {
      onSuccess: (data) => {
        setTodos((prev) => [...prev, data]);
      },
    }
  );

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="contained"
        sx={{
          height: '60px',
          width: '60px',
          position: 'absolute',
          borderRadius: '100%',
          right: '15px',
          bottom: '15px',
        }}
        onClick={() => {
          console.log('scrollRef.current?.scrollHeight', scrollRef.current);
          scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ArrowDownward sx={{ height: '30px', width: '30px' }} />
      </Button>
      <Box sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Box
          sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}
          ref={scrollRef}
        >
          <InfiniteScroll
            sx={{ display: 'flex', flexDirection: 'column-reverse' }}
            wrapperSx={{ border: 'solid', borderColor: 'red' }}
            inverse
            onLoadMore={refetch}
            loading={isLoading}
            reachedMaxItems={false}
          >
            {todos.map((todo) => (
              <Card key={todo.id}>
                <CardContent>
                  <Typography variant="h4" component="div">
                    {todo.id}: {todo.title}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {todo.completed ? 'Completed' : 'Not Completed'}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </InfiniteScroll>
        </Box>
      </Box>
    </>
  );
};

export default InfiniteScrollingPage;
