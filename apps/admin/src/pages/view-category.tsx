import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import fetchCategories from '@/middlewares/fetchCategories';
import { CategoryResponseBody } from '@/utils/api/client/zod';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export type CategoryProps = {
  data: CategoryResponseBody[];
};

export type CategoryTableProps = {
  data: CategoryProps[];
};

const useCategoryPageQuery = () => {
  const { data } = useQuery('cat', async () => fetchCategories());
  return data;
};

const headCells: Header[] = [
  {
    key: 'name',
    label: 'Category',
  },
  {
    key: 'name chinese',
    label: 'Category (Chinese)',
  },
  {
    key: 'status',
    label: 'Status',
  },
];

const CategoryTable = ({ data }: CategoryTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BaseTableData[]>([]);
  const categoryQuery = useCategoryPageQuery();
  console.log(categoryQuery);

  const sortRows = (): void => {
    // const rowsData: BaseTableData[] = data.map((item: CategoryProps) => ({
    //   id: item.data[0].id,
    //   category: item.data[0].name,
    //   chinese: item.data[0].name,
    //   status: item.data[0].active ? 'Active' : 'Inactive',
    // }));
    // setRows(rowsData);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    sortRows();
  }, [data]);

  return (
    <BaseTable
      heading="Categories"
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
  );
};

export default CategoryTable;
