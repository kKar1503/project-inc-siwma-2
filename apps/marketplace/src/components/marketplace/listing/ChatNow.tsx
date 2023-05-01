import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export type ChatNowProps = {
  profilePic: string;
  companyName: string;
};

const ChatNow = ({ profilePic, companyName }: ChatNowProps) => (
  <Card
    sx={{ maxWidth: 430, maxHeight: 600, border: '1px solid #C4C4C4', backgroundColor: '#F0F1F1' }}
  >
    <CardContent sx={{ pl: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <Avatar sx={{ mb: 1.5 }}>{profilePic}</Avatar>
        <Box sx={{ pb: 2, marginLeft: 2 }}>
          <Typography variant="body2" color="text.primary" fontWeight={500} fontSize={20}>
            {companyName}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="contained" sx={{ width: 350, backgroundColor: '#2563EB' }}>
          Chat Now
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default ChatNow;
