import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import fetchParameters from '@/middlewares/fetchParameters';
import { ParameterResponseBody } from '@/utils/api/client/zod';
import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';
import Box from '@mui/material/Box';

export type ParameterProps = {
  data: ParameterResponseBody[];
};

export type ParameterTableProps = {
  data: ParameterProps[];
};

const useParameterQuery = () => {
  const { data } = useQuery('parameter', async () => fetchParameters());
  return data;
};

const headCells: Header[] = [
  {
    key: 'parameter name',
    label: 'Parameter Name',
  },
  {
    key: 'display name',
    label: 'Display Name',
  },
  {
    key: 'parameter type',
    label: 'Parameter Type',
  },
  {
    key: 'data type',
    label: 'Data Type',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'enabled',
    label: 'Enabled',
    replace: {
      a: 'Yes',
      false: 'No',
    },
  },
];

const ParameterTable = ({ data }: ParameterTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BaseTableData[]>([]);
  const parameterQuery = useParameterQuery();
  console.log(useParameterQuery);
  const theme = useTheme();
  const { spacing } = theme;
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const tableStyle = useMemo(() => {
    if (isSm) {
      return {
        py: spacing(3),
        px: '20px',
      };
    }
    if (isMd) {
      return {
        py: spacing(3),
        px: '40px',
      };
    }
    if (isLg) {
      return {
        py: spacing(3),
        px: '60px',
      };
    }
    return {
      py: spacing(3),
      px: '20px',
    };
  }, [isSm, isMd, isLg]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Head>
        <title>Parameters</title>
      </Head>
      <Container sx={tableStyle}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained" sx={({ palette }) => ({ bgcolor: palette.primary[400] })}>
            Create Parameter
          </Button>
        </Box>
        <BaseTable
          heading="Parameters"
          rows={rows}
          headers={headCells}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onDelete={() => console.log('delete')}
          onEdit={() => console.log('edit')}
          onToggle={() => console.log('toggle')}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          totalCount={rows.length}
        />
      </Container>
    </>
  );
};

export default ParameterTable;
