// ** React Imports
import React, { useMemo } from 'react';

// ** MUI Imports
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';

// ** Hooks Imports
import { useResponsiveness } from '@inc/ui';

// ** Custom Components Imports
import ActionCell from './ActionCell';

// ** SizedSkeletonRow Prop Types
export interface SizedSkeletonRowProps {
  size: number;
}

const SizedSkeletonRows = (props: SizedSkeletonRowProps) => {
  // ** Props
  const { size } = props;

  // ** Hooks
  const [isSm] = useResponsiveness(['sm']);

  // Generate array
  const sizedArray = useMemo(() => {
    const arr = new Array<number>(size);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = i;
    }
    return arr;
  }, [size]);

  return (
    <>
      {sizedArray.map((i) => (
        <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell
            component="th"
            scope="row"
            sx={{
              minWidth: 190,
              width: 602,
            }}
          >
            <Skeleton variant="rectangular" />
          </TableCell>
          <TableCell align="center" sx={{ minWidth: 110 }}>
            <Skeleton variant="rectangular" />
          </TableCell>
          <TableCell align="center" sx={{ minWidth: 120 }}>
            <Skeleton variant="rectangular" />
          </TableCell>
          <TableCell align="center" sx={{ minWidth: 180, width: 180 }}>
            <Skeleton variant="rectangular" />
          </TableCell>
          <TableCell align="center" sx={{ minWidth: 150, width: 150 }}>
            <Skeleton variant="rectangular" />
          </TableCell>
          <ActionCell
            isBookmarked={false}
            sx={{ width: isSm ? 66 : 150, minWidth: isSm ? 66 : 150 }}
          />
        </TableRow>
      ))}
    </>
  );
};

export default SizedSkeletonRows;
