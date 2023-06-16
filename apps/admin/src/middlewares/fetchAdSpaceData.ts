import { DataType } from '@/components/advertisementsDashboard/adSpaceTable';

const fetchAdSpaceData = async (): Promise<DataType[]> => {
  function createData(
    id: string,
    user: string,
    email: string,
    company: string,
    mobileNumber: string,
    active: boolean,
  ): DataType {
    return {
      id,
      user,
      email,
      company,
      mobileNumber,
      active,
    };
  }

  return [
    createData('1', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293', true),
    createData('2', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293', true),
    createData('3', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293', true),
    createData('4', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293', true),
    createData('5', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293', true),
    createData('6', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293', false),
    createData('7', 'Sally Knox', 'sallyknox_slfi@gmail.com', 'SHI LI FANG IRONWORKS PTE', '+65 9832 0293', false),
  ];
};

export default fetchAdSpaceData;
