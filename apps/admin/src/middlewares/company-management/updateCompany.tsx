import apiClient from '@/utils/api/client/apiClient';
import companies from '@/utils/api/client/zod/companies';

export type PutCategoryRequestBody = {
  name: string;
  website: string;
  bio: string;
  image?: string;
};

const updateCompany = async (data: PutCategoryRequestBody, id: string) => {
  const response = await apiClient.put(`/v1/companies/${id}`, data);

  const parsedCompany = companies.update.parse(response.data.data[0]);

  return parsedCompany;
};

export default updateCompany;
