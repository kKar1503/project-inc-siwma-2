import React, { useEffect, useMemo, useState } from 'react';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import { Company } from '@/utils/api/client/zod/companies';
import DeleteCompanyModal from '@/components/modals/DeleteCompanyModal';
import EditCompanyModal from '@/components/modals/EditCompanyModal';

export type CompanyManagementProps = {
  data: Company[];
  count: number;
};

export type CompanyTableProps = {
  data: CompanyManagementProps;
  count: number;
  updateData: (lastIdPointer?: number, limit?: number) => void;
};

function createData(id: string, name: string, bio: string | null): BaseTableData {
  return {
    id,
    name,
    bio: bio || '',
  };
}

const headCells: Header[] = [
  {
    key: 'name',
    label: 'Company Name',
  },
  {
    key: 'bio',
    label: 'Bio',
  },
];

const CompanyTable = ({ data, count, updateData }: CompanyTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BaseTableData[]>([]);
  const [id, setId] = useState<string>('');
  const [ids, setIds] = useState<string[]>([]);

  // modals
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const companyRows = useMemo(
    () => data.data.map((item) => createData(item.id, item.name, item.bio)),
    [data]
  );

  useEffect(() => {
    setRows(companyRows);
  }, [companyRows, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    const lastIdPointer = rows.length * newPage;
    updateData(lastIdPointer, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);

    updateData(0, newRowsPerPage);
  };

  const handleDeleteRows = (rows: readonly BaseTableData[]) => {
    const ids = rows.map((row) => row.id);
    setIds(ids);
    setOpenDeleteModal(true);

    return [];
  };

  const handleEditRow = (row: BaseTableData) => {
    const { id } = row;
    setId(id);
    setOpenEditModal(true);
  };

  return (
    <>
      <BaseTable
        heading="Registered Companies"
        rows={rows}
        headers={headCells}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onDelete={handleDeleteRows}
        onEdit={handleEditRow}
        onToggle={() => console.log('toggle')}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        totalCount={count}
      />
      <DeleteCompanyModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        companies={ids}
        updateData={updateData}
      />
      <EditCompanyModal
        open={openEditModal}
        setOpen={() => setOpenEditModal(false)}
        company={id}
        updateData={updateData}
      />
    </>
  );
};

export default CompanyTable;
