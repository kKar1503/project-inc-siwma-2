
export interface Data {
  id: string;
  user: string;
  email: string;
  company: string;
  mobileNumber: string;
  active: boolean;
}

function createData(
  id: string,
  user: string,
  email: string,
  company: string,
  mobileNumber: string,
  active: boolean,
): Data {
  return {
    id,
    user,
    email,
    company,
    mobileNumber,
    active,
  };
}

export const rows = [
  createData('1', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293',true),
  createData('2', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293',true),
  createData('3', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293',true),
  createData('4', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293',true),
  createData('5', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293',true),
  createData('6', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293',false),
  createData('7', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293',false),
];
export interface HeadCell {
  id: keyof Data;
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

