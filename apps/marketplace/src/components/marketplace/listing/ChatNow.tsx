import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'

export type ChatNowProps = {
  profilePic: string;
  companyName: string;
};

const ChatNow = ({
  profilePic,
  companyName,
}: ChatNowProps) => (
    <Card sx={{ maxWidth: 330, maxHeight: 600, border: '1px solid #C4C4C4' }}>
      <CardContent sx={{ pl: 2}}>
        {/* MUI default spacing is 8px */}
        <div style ={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10}} >
            <Avatar sx={{ mb: 1.5 }}>{profilePic}</Avatar>
            <Box
            sx={{ pb: 2, marginLeft: 2 }}
            >
                <Typography variant="body2" color="text.primary" fontWeight={400} fontSize={20}>
                    {companyName}
                </Typography>
            </Box>
        </div>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button variant='contained' color='primary' sx={{ width: 250}}>
                Chat Now
            </Button>
          </Box> 
      </CardContent>
    </Card>
  );


export default ChatNow;
