import { GridColDef } from '@mui/x-data-grid';

export interface AdSpaceUser {
  id: number;
  user: string;
  email: string;
  companyName: string;
  number: number;
}

export const displayColumns: GridColDef[] = [
  { field: 'user', headerName: 'User', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  {
    field: 'companyName',
    headerName: 'Company',
    type: 'number',
    width: 90,
  },
  {
    field: 'number',
    headerName: 'Number',
    width: 160,
  },
];

