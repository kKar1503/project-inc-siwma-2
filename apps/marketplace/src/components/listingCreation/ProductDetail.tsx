import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
