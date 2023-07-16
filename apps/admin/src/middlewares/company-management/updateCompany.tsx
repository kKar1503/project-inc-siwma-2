import apiClient from '@/utils/api/client/apiClient';
import companies from '@/utils/api/client/zod/companies';

export type PutCompanyRequestBody = {
  name: string;
  website: string;
  bio: string;
  image?: string;
};

const updateCompany = async (data: PutCompanyRequestBody, id: string) => {
  console.log(data);
  console.log(id);
  if (!id) {
    return null;
  }

  const response = await apiClient.put(`/v1/companies/${id}`, data);

  const parsedCompany = companies.update.parse(response.data.data[0]);
  console.log(parsedCompany);
  return parsedCompany;
};

export default updateCompany;
