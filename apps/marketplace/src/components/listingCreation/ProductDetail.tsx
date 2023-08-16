import { Typography } from '@mui/material';
import { Box } from '@mui/system';

type ProductDetailProps = {
  header: string;
  text?: string | null;
};

const ProductDetail = ({ header, text }: ProductDetailProps) => (
  <Box>
    <Typography variant="body1" fontWeight="medium">
      {header}
    </Typography>
    <Typography variant="body1">{text || '-'}</Typography>
  </Box>
);

export default ProductDetail;
