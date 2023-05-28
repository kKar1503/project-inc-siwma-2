import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ListingResponseBody } from '@/utils/api/client/zod';

export type ChatNowProps = {
  data: ListingResponseBody;
};

const ChatNow = ({ data }: ChatNowProps) => (
  <Card
    sx={({ palette }) => ({
      width: { md: 250, lg: 300 },
      maxHeight: { md: 300, lg: 400 },
      border: palette.grey[300],
      backgroundColor: palette.grey[100],
    })}
  >
    <CardContent sx={{ pl: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: { sx: 0, md: 0, lg: 3 },
          paddingTop: 1,
          paddingBottom: 2,
        }}
      >
        <Avatar
          sx={({ spacing }) => ({
            mb: spacing(2),
            height: { sx: 21, md: 35, lg: 42 },
            width: { sx: 21, md: 35, lg: 42 },
          })}
        >
          {data.owner.profilePic}
        </Avatar>
        <Box sx={{ pb: { md: 1, lg: 2 }, marginLeft: 2 }}>
          <Typography
            variant="body2"
            fontWeight={500}
            sx={({ palette }) => ({
              color: palette.common.black,
              fontSize: { sx: 8, md: 12, lg: 16 },
            })}
          >
            {data.owner.company.name}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          variant="contained"
          sx={({ palette }) => ({ width: 250, backgroundColor: palette.primary.main })}
        >
          Chat Now
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default ChatNow;
