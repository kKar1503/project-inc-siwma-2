import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import fetchParameters from '@/middlewares/fetchParameters';
import { Parameter, ParameterResponseBody } from '@/utils/api/client/zod';
import { useState, useMemo, useEffect } from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';
import Link from 'next/link';

type DataType = 'string' | 'number' | 'boolean';
type TableType = 'WEIGHT' | 'DIMENSION' | 'TWO_CHOICES' | 'MANY_CHOICES' | 'OPEN_ENDED';
export type ParameterProps = {
  id: string;
  name: string;
  displayName: string;
  type: TableType;
  dataType: DataType;
  active?: boolean;
};
export type ParameterTableProps = {
  data: ParameterResponseBody[];
};

function createData(
  id: string,
  name: string,
  displayName: string,
  type: TableType,
  dataType: DataType,
  active: boolean
): BaseTableData {
  return {
    id,
    name,
    displayName,
    type,
    dataType,
    active,
  };
}

const headCells: Header[] = [
  {
    key: 'name',
    label: 'Parameter Name',
  },
  {
    key: 'displayName',
    label: 'Display Name',
  },
  {
    key: 'type',
    label: 'Parameter Type',
  },
  {
    key: 'dataType',
    label: 'Data Type',
  },
  {
    key: 'active',
    label: 'Status',
    replace: {
      a: 'Active',
      false: 'Inactive',
    },
  },
];

const useParameterQuery = () => {
  const { data } = useQuery('parameter', async () => fetchParameters());
  return data;
};

const ParameterTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BaseTableData[]>([]);
  const parameter = useParameterQuery();

  const sortRows = (): void => {
    const rowsData: BaseTableData[] = [];
    Object.values(parameter ?? {}).forEach((item: ParameterProps) => {
      rowsData.push(
        createData(
          item.id,
          item.name,
          item.displayName,
          item.type,
          item.dataType,
          item.active ?? false
        )
      );
    });
    console.log(rowsData);
    setRows(rowsData);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageRows = rows.slice(startIndex, endIndex);
  console.log(pageRows);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  useEffect(() => {
    sortRows();
  }, [parameter]);

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
          <Link href="/create-parameter">
            <Button variant="contained" sx={({ palette }) => ({ bgcolor: palette.primary[400] })}>
              Create Parameter
            </Button>
          </Link>
        </Box>
        <BaseTable
          heading="Parameters"
          rows={pageRows}
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
