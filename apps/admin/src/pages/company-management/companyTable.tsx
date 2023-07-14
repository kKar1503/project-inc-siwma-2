import React, { useEffect, useState } from 'react';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import DeleteCompanyModal from '@/components/modals/DeleteCompanyModal';
import EditCompanyModal from '@/components/modals/EditCompanyModal';

export type CompanyProps = {
  id: string;
  name: string;
  bio: string;
  website: string;
  visible: boolean;
  image: string;
  comments: string;
  createdAt: string;
};

export type CompanyTableProps = {
  data: CompanyProps[];
};

function createData(
  id: string,
  name: string,
  bio: string,
  website: string,
  visible: boolean,
  image: string,
  comments: string,
  createdAt: string
): BaseTableData {
  return {
    id,
    name,
    bio,
    website,
    visible: visible ?? false,
    image,
    comments,
    createdAt,
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
  {
    key: 'website',
    label: 'Website',
  },
  {
    key: 'visible',
    label: 'Visible',
    replace: {
      a: 'Yes',
      false: 'No',
    },
  },
  {
    key: 'image',
    label: 'Image',
  },
  {
    key: 'comments',
    label: 'Comments',
  },
  {
    key: 'createdAt',
    label: 'Created At',
  },
];

const CompanyTable = ({ data }: CompanyTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BaseTableData[]>([]);

  // modals
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const sortRows = async (): Promise<void> => {
    const rowsData: BaseTableData[] = [];

    data.forEach((item: CompanyProps) =>
      rowsData.push(
        createData(
          item.id,
          item.name,
          item.bio,
          item.website,
          item.visible,
          item.image,
          item.comments,
          item.createdAt
        )
      )
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

  const handleDeleteRows = () => {
    setOpenDeleteModal(true);
  };

  const handleEditRow = () => {
    setOpenEditModal(true);
  };

  useEffect(() => {
    sortRows();
  }, [data]);

  return (
    <>
      <BaseTable
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
      <DeleteCompanyModal open={openDeleteModal} setOpen={setOpenDeleteModal} />
      <EditCompanyModal open={openEditModal} setOpen={() => setOpenEditModal(false)} />
    </>
  );
};

export default CompanyTable;
