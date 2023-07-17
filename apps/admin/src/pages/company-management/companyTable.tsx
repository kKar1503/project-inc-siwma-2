import React, { useEffect, useState } from 'react';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import { Company } from '@/utils/api/client/zod/companies';
import { useQuery } from 'react-query';
import fetchCompanies from '@/middlewares/company-management/fetchCompanies';
import DeleteCompanyModal from '@/components/modals/DeleteCompanyModal';
import EditCompanyModal from '@/components/modals/EditCompanyModal';

// export type CompanyTableProps = {
//   data: Company[];
// };

const useGetCompaniesQuery = () => {
  const { data } = useQuery('companies', async () => fetchCompanies(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return data;
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

const CompanyTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BaseTableData[]>([]);
  const [id, setId] = useState<string>('');
  const [ids, setIds] = useState<string[]>([]);
  const companies = useGetCompaniesQuery();
  const [companiesData, setcompaniesData] = useState<Company[]>();

  const handleCompaniesChange = async (companies: Company[]) => {
    setcompaniesData(companies);
  };

  useEffect(() => {
    if (companies) {
      handleCompaniesChange(companies);
    }
  }, [companies]);

  const updateCompanyData = async () => {
    const updatedCompanies = await fetchCompanies();
    handleCompaniesChange(updatedCompanies);
  };

  // modals
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const sortRows = async (): Promise<void> => {
    const rowsData: BaseTableData[] = [];

    companiesData?.forEach((item: Company) =>
      rowsData.push(createData(item.id, item.name, item.bio))
    );

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
    setId(id);
    setOpenEditModal(true);
  };

  useEffect(() => {
    sortRows();
  }, [companiesData]);

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
        totalCount={rows.length}
      />
      <DeleteCompanyModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        companies={ids}
        updateData={updateCompanyData}
      />
      <EditCompanyModal
        open={openEditModal}
        setOpen={() => setOpenEditModal(false)}
        company={id}
        updateData={updateCompanyData}
      />
    </>
  );
};

export default CompanyTable;
