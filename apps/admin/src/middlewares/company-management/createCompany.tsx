import apiClient from '@/utils/api/client/apiClient';
import { PostCompanyRequestBody } from '@/utils/api/server/zod';

const createCompany = async (requestBody: PostCompanyRequestBody) => {
  const response = await apiClient.post(`v1/companies/`, requestBody);
  const newCompany = response.data.data;

  return newCompany;
};

export default createCompany;
