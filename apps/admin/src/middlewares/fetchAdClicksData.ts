export interface FetchAdClicksDataResponse {
  data: Array<{
    company: string;
    clicks: number;
  }>;
}

const fetchAdClicksData = async (): Promise<FetchAdClicksDataResponse> => {

  return {
    data:
      [
        {
          company: 'SHI LI FANG IRONWORKS PTE',
          clicks: 45,
        },
        {
          company: 'SHI LI FANG IRONWORKS PTE',
          clicks: 12,
        },
        {
          company: 'SHI LI FANG IRONWORKS PTE',
          clicks: 24,
        },
        {
          company: 'SHI LI FANG IRONWORKS PTE',
          clicks: 12,
        },
        {
          company: 'SHI LI FANG IRONWORKS PTE',
          clicks: 53,
        },
        {
          company: 'SHI LI FANG IRONWORKS PTE',
          clicks: 12,
        },
      ],
  };
};

export default fetchAdClicksData;
