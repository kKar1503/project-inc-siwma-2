import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export interface userDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  unitPrice: boolean;
  negotiable: boolean;
  categoryId: string;
  type: string;
  owner: {
    id: string;
    name: string;
    email: string;
    company: {
      id: string;
      name: string;
      website: string;
      bio: string;
      image: '';
      visible: boolean;
    };
    profilePic: null;
    mobileNumber: string;
    contactMethod: string;
    bio: null;
  };
  active: boolean;
  parameter: [
    {
      paramId: string;
      value: number;
    },
    {
      paramId: string;
      value: number;
    }
  ];
}

export type ChatNowProps = {
  data: userDetails
};

const ChatNow = ({ data }: ChatNowProps) => (
  <Card
    sx={{ maxWidth: 300, maxHeight: 400, border: '1px solid #C4C4C4', backgroundColor: '#F0F1F1' }}
  >
    <CardContent sx={{ pl: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 3,
          paddingTop: 1,
          paddingBottom: 2,
        }}
      >
        <Avatar sx={{ mb: 1.5 }}>{data.owner.profilePic}</Avatar>
        <Box sx={{ pb: 2, marginLeft: 2 }}>
          <Typography variant="body2" color="text.primary" fontWeight={500} fontSize={16}>
            {data.owner.company.name}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="contained" sx={{ width: 250, backgroundColor: '#2563EB' }}>
          Chat Now
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default ChatNow;
