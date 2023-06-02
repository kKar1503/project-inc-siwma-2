import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { Company } from '@/utils/api/client/zod/companies';

export type CompanyItemData = {
  data: Company;
};

const CompanyItem = ({ data }: CompanyItemData) => {
  const [isSm] = useResponsiveness(['sm']);

  return (
    <Card sx={{ height: isSm ? 240 : 280 }}>
      {data.image ? (
        <CardMedia component="img" height={isSm ? 120 : 140} alt="company image" src={data.image} />
      ) : (
        <CardMedia component="div" style={{ backgroundColor: 'gray', height: isSm ? 120 : 140 }} />
      )}
      <CardContent>
        <Typography variant="h6" align="center" fontSize={isSm ? '1rem' : '1.25rem'}>
          {data.name}
        </Typography>
        {data.bio && (
          <Typography variant="body1" align="center" fontSize={isSm ? '0.75rem' : '1rem'}>
            {data.bio.length > 50 ? `${data.bio.slice(0, 50)}...` : data.bio}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyItem;
