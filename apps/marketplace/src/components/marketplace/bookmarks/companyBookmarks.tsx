import Grid from '@mui/material/Grid';
import DisplayResults from '@/layouts/DisplayResults';
import CompanyItem from '@/components/marketplace/company/CompanyItem';
import { Company } from '@/utils/api/client/zod/companies';

export type CompanyBookmarksProps = {
  data: Company[];
  updateBookmarkData: () => void;
};

const title = { single: 'Company', plural: 'Companies' };

const CompanyBookmarks = ({ data, updateBookmarkData }: CompanyBookmarksProps) => (
  <DisplayResults filter={false} data={{ title, noOfItems: data.length }}>
    {data && data.length > 0 && (
      <Grid container display="flex" spacing={1}>
        {data.map((item: Company) => (
          <Grid item sm={3} md={4} key={item.id}>
            <CompanyItem data={item} updateBookmarkData={updateBookmarkData} />
          </Grid>
        ))}
      </Grid>
    )}
  </DisplayResults>
);

export default CompanyBookmarks;
