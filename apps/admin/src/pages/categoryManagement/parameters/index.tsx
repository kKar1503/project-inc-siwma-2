import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import { useState, useMemo, useEffect } from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import { Parameter, ParameterResponseBody } from '@/utils/api/client/zod';
import fetchParameters from '@/middlewares/fetchParameters';
import DeleteParameterModal from '@/components/modals/DeleteParameterModal';

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
      true: 'Active',
      false: 'Inactive',
    },
  },
];

const useParameterQuery = () => {
  const { data } = useQuery('parameter', async () => fetchParameters());
  return data;
};

const ParameterTable = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [ids, setIds] = useState<string[]>([]);
  const [parameterData, setParameterData] = useState<Parameter[]>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BaseTableData[]>([]);

  const theme = useTheme();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const router = useRouter();
  const parameter = useParameterQuery();

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageRows = rows.slice(startIndex, endIndex);

  // const handleParametersChange = async (parameter: Parameter[]) => {
  //   setParameterData(parameter);
  // };

  // useEffect(() => {
  //   if (parameter) {
  //     handleParametersChange(parameter);
  //   }
  // }, [parameter]);

  // const updateParameterData = async () => {
  //   const updatedParameters = await fetchParameters();
  //   handleParametersChange(updatedParameters);
  // };

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
    setRows(rowsData);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteRows = (rows: readonly BaseTableData[]) => {
    const ids = rows.map((row) => row.id);
    setIds(ids);
    setOpenDeleteModal(true);
  };

  const handleEditRow = (row: BaseTableData) => {
    const { id } = row;
    const editUrl = `parameters/${id}/edit-parameter`;
    router.push(editUrl);
  };

  const handleCreateParameter = () => {
    router.push(`parameters/create-parameter`);
  };

  const tableStyle = useMemo(() => {
    if (isSm) {
      return {
        px: '20px',
      };
    }
    if (isMd) {
      return {
        px: '40px',
      };
    }
    if (isLg) {
      return {
        px: '60px',
      };
    }
    return {
      px: '20px',
    };
  }, [isSm, isMd, isLg]);

  useEffect(() => {
    sortRows();
  }, [parameter]);

  // useEffect(() => {
  //   if (!parameter.isFetched) {
  //     return
  //   }

  //   if (parameter.isError) {
  //     if ('status' in (parameter.error as any) && (parameter.error as any).status === 404) {
  //       router.replace('/404');
  //       return;
  //     }

  //     router.replace('/500');
  //     return;
  //   }

  //   if (parameter === undefined) {
  //     router.replace('/500');
  //   }
  // }, [parameter.isFetched]);

  // if (!parameter.isFetched) {
  //   return <SpinnerPage />;
  // }

  return (
    <>
      <Head>
        <title>Parameters</title>
      </Head>
      <Container sx={({ spacing }) => ({ py: spacing(3), tableStyle })}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="contained"
            sx={({ palette, spacing }) => ({ bgcolor: palette.primary[400], mb: spacing(1) })}
            onClick={handleCreateParameter}
          >
            Create Parameter
          </Button>
        </Box>
        <BaseTable
          heading="Parameters"
          rows={pageRows}
          headers={headCells}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onDelete={handleDeleteRows}
          onEdit={handleEditRow}
          onToggle={() => console.log('toggle')}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          totalCount={rows.length}
        />
        {/* <DeleteParameterModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          parameters={ids}
          updateData={updateParameterData}
        /> */}
      </Container>
    </>
  );
};

export default ParameterTable;
