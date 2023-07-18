import apiClient from '@/utils/api/client/apiClient';

export type PostCompanyRequestBody = {
  name: string;
  website: string;
  comments: string;
  image?: File | null;
};

const createCompany = async (requestBody: PostCompanyRequestBody) => {
  const response = await apiClient.post(`v1/companies/`, requestBody);
  const newCompany = response.data.data;

  return newCompany;
};

export default createCompany;
