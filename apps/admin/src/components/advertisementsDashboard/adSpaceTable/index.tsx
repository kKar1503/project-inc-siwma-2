import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import React from 'react';
import { AdSpaceUser, displayColumns } from '@/components/advertisementsDashboard/adSpaceTable/dataLayout';


interface AdSpaceTableProps {
  title: string;
  users?: Array<AdSpaceUser>;
}
const AdSpaceTable = ({
                        title,
                        users,
                      }: AdSpaceTableProps) => {


  return (
    <Box>
      <h2>{title}</h2>

      <DataGrid
        rows={users || []}
        columns={displayColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 4 },
          },
        }}
        pageSizeOptions={[4, 8]}
        checkboxSelection
        autoHeight
      />
    </Box>
  );
};

export default AdSpaceTable;
