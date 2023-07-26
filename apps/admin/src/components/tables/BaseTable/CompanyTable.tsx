import React, { useEffect, useMemo, useState } from 'react';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import { Company } from '@/utils/api/client/zod/companies';
import DeleteCompanyModal from '@/components/modals/DeleteCompanyModal';
import EditCompanyModal from '@/components/modals/EditCompanyModal';

export type CompanyWithEmails = Company & {
  emails: string[];
};

export type CompanyTableProps = {
  data: CompanyWithEmails[];
  count: number;
  updateData: (lastIdPointer?: number, limit?: number) => void;
};

function createData(id: string, name: string, emails: string, bio: string | null): BaseTableData {
  return {
    id,
    name,
    emails: emails || '',
    bio: bio || '',
  };
}

const headCells: Header[] = [
  {
    key: 'name',
    label: 'Company Name',
  },
  { key: 'emails', label: 'Emails' },
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
  const [totalCount, setTotalCount] = useState<number>(count);
  const [paginationState, setPaginationState] = useState<{
    [key: number]: { lastIdPointer: number; limit: number };
  }>({});

  // modals
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const truncateBio = (bio: string | null, maxWords: number) => {
    if (!bio) return '';
    const words = bio.split(' ');
    if (words.length > maxWords) {
      const truncatedWords = words.slice(0, maxWords);
      return `${truncatedWords.join(' ')}...`;
    }
    return bio;
  };

  const companyRows = useMemo(
    () =>
      data.map((item) =>
        createData(item.id, item.name, item.emails.join(', '), truncateBio(item.bio, 15))
      ),
    [data]
  );

  useEffect(() => {
    setRows(companyRows);
    setTotalCount(count);
  }, [companyRows, data, count, paginationState]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    if (newPage === 0) {
      // For the first page, reset lastIdPointer to 0 to fetch from the beginning
      setPaginationState({
        ...paginationState,
        [newPage]: { lastIdPointer: 0, limit: rowsPerPage },
      });
      updateData(0, rowsPerPage);
    } else if (newPage < page) {
      // For previous page, use the lastIdPointer of the previous page from paginationState
      const prevPageData = paginationState[newPage];
      if (prevPageData) {
        const { lastIdPointer, limit } = prevPageData;
        setPaginationState({ ...paginationState, [newPage]: { lastIdPointer, limit } });
        updateData(lastIdPointer, limit);
      }
    } else {
      // For next page, calculate the new lastIdPointer based on the last data item of the current page
      const lastDataOfCurrentPage = rows[rows.length - 1];
      const idPointer = parseInt(lastDataOfCurrentPage.id, 10);
      setPaginationState({
        ...paginationState,
        [newPage]: { lastIdPointer: idPointer, limit: rowsPerPage },
      });
      updateData(idPointer, rowsPerPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    setPaginationState({ 0: { lastIdPointer: 0, limit: newRowsPerPage } });
    updateData(0, newRowsPerPage);
  };

  const handleDeleteRows = (rows: readonly BaseTableData[]) => {
    const ids = rows.map((row) => row.id);
    setIds(ids);
    setPage(0);

    setOpenDeleteModal(true);

    return [];
  };

  const handleEditRow = (row: BaseTableData) => {
    const { id } = row;
    setId(id);
    setPage(0);
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
        totalCount={totalCount}
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
