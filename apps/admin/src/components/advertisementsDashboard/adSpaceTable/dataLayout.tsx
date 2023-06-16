
export interface DataType {
  id: string;
  user: string;
  email: string;
  company: string;
  mobileNumber: string;
  active: boolean;
}

export interface HeadCell {
  id: keyof DataType;
  label: string;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'user',
    label: 'User',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'company',
    label: 'Company',
  },
  {
    id: 'mobileNumber',
    label: 'Mobile Number',
  },
];
