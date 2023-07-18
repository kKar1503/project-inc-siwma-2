export interface FetchAdSpaceDataResponse {
  data: Array<{
    id: string;

    company: string;
    image: string;
    description: string;
    link: string;
    active: boolean;
    createdAt: string;
    startDate: string;
    endDate: string;
  }>;
}

const fetchAdSpaceData = async (): Promise<FetchAdSpaceDataResponse> => {
  function createData(
    id: string,
    company: string,
    image: string,
    description: string,
    link: string,
    active: boolean,
    createdAt: string,
    startDate: string,
    endDate: string,
  ) {
    return {
      id,
      company,
      image,
      description,
      link,
      active,
      createdAt,
      startDate,
      endDate,
    };
  }

  return {
    data:
      [
        createData('1', 'SHI LI FANG IRONWORKS PTE', 'image/link', 'sample description', 'https://www.adlink.com', false, '2021-08-01', '2021-08-01', '2021-08-01'),
        createData('2', 'SHI LI FANG IRONWORKS PTE', 'image/link', 'sample description', 'https://www.adlink.com', true, '2021-08-01', '2021-08-01', '2021-08-01'),
        createData('3', 'SHI LI FANG IRONWORKS PTE', 'image/link', 'sample description', 'https://www.adlink.com', false, '2021-08-01', '2021-08-01', '2021-08-01'),
        createData('4', 'SHI LI FANG IRONWORKS PTE', 'image/link', 'sample description', 'https://www.adlink.com', true, '2021-08-01', '2021-08-01', '2021-08-01'),
      ]
  };
};

export default fetchAdSpaceData;
