/* eslint-disable no-nested-ternary */
// ** React Imports
import React from 'react';

// ** MUI Imports
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { red } from '@mui/material/colors';

// ** Types Imports
import type { Listing } from '@/utils/api/server/zod/listingTable';

// ** Store Imports
import useProductStore from '@/stores/products';
import useParamStore from '@/stores/parameters';

// ** Custom Components
import S3Avatar from '@/components/S3Avatar';
import S3BoxImage from '@/components/S3BoxImage';

// ** CollapsibleRow Props Types
export interface CollapsibleRowProps {
  row: Listing;
  rowOpened: string;
  isProductFetching: boolean;
  isParamFetching: boolean;
}

const CollapsibleRow = (props: CollapsibleRowProps) => {
  // ** Props
  const { row, rowOpened, isProductFetching, isParamFetching } = props;

  // ** Stores
  const products = useProductStore((state) => state.products);
  const params = useParamStore((state) => state.params);

  return (
    <TableRow>
      <TableCell colSpan={7} sx={{ py: 0 }}>
        <Collapse in={rowOpened === row.id} timeout="auto" unmountOnExit>
          <Typography variant="h6" component="p" sx={{ my: 2 }}>
            Listing Details
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xl={2} lg={2} md={6} sm={6} xs={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyItems: 'center',
                  alignItems: 'center',
                  margin: 'auto',
                }}
              >
                <S3Avatar
                  sx={({ spacing }) => ({ mb: spacing(1), bgcolor: red[500] })}
                  src={row.owner.profilePic ?? ''}
                >
                  {row.owner.name.charAt(0)}
                </S3Avatar>
                <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {row.owner.name}
                </Typography>
                <Typography variant="body2" sx={{ wordWrap: 'break-word', textAlign: 'center' }}>
                  {row.owner.company.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xl={2} lg={2} md={6} sm={6} xs={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyItems: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>Image Reference</Typography>
                <S3BoxImage
                  sx={{ height: 150, width: 'auto' }}
                  src={
                    products[row.product]?.category.crossSectionImage ||
                    '/images/catPlaceholder.png'
                  }
                />
              </Box>
            </Grid>
            <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
              <Grid container spacing={2} ml={3}>
                {row.parameters.map(({ parameterId, value }) => (
                  <Grid item xl={3} lg={3} md={3} sm={2} xs={2} direction="row">
                    <Box>
                      <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                        {params[parameterId]?.displayName}
                      </Typography>
                      <Typography>{`${value}${
                        params[parameterId]?.type === 'WEIGHT'
                          ? ' kg'
                          : params[parameterId]?.type === 'DIMENSION'
                          ? params[parameterId]?.displayName === 'Length'
                            ? ' m'
                            : ' mm'
                          : ''
                      }`}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default CollapsibleRow;
