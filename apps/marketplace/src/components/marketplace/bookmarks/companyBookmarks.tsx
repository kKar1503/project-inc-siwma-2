import Grid from '@mui/material/Grid';
import DisplayResults from '@/layouts/DisplayResults';
import CompanyItem from '@/components/marketplace/company/CompanyItem';
import { Company } from '@/utils/api/client/zod/companies';

const CompanyBookmarks = ({ data }: { data: Company[] }) => (
  <DisplayResults filter={false} data={{ title: 'Company', noOfItems: data.length }}>
    {data && data.length > 0 && (
      <Grid container display="flex" spacing={1}>
        {data.map((item: Company) => (
          <Grid item sm={3} md={4} key={item.id}>
            <CompanyItem data={item} />
          </Grid>
        ))}
      </Grid>
    )}
  </DisplayResults>
);

export default CompanyBookmarks;
