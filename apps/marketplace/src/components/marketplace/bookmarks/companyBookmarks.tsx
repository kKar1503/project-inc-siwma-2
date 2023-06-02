import { ProductListingItemProps } from '@/components/marketplace/listing/ProductListingItem';
import DisplayResults from '@/layouts/DisplayResults';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Company } from '@/utils/api/client/zod/companies';

const CompanyBookmarks = ({ data }: { data: Company[] }) => (
  <DisplayResults filter={false} data={{ title: 'Companies', noOfItems: data.length }}>
    {data && data.length > 0 && (
      <Grid container display="flex" spacing={1}>
        {data.map((item: Company) => (
          <Grid item sm={3} md={4} key={item.name}>
            <Typography>{item.name}</Typography>
          </Grid>
        ))}
      </Grid>
    )}
  </DisplayResults>
);

export default CompanyBookmarks;
