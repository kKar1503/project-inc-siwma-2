import apiClient from '@/utils/api/client/apiClient';
import companies from '@/utils/api/client/zod/companies';
import { PostCompanyRequestBody } from '@/utils/api/server/zod';

const createCompany = async (data: PostCompanyRequestBody, image?: File) => {
  console.log(data);
  const response = await apiClient.post(`v1/companies/`, data);
  const createdCompany = companies.create.parse(response.data.data[0]);

  if (image) {
    const formData = new FormData();
    formData.append('file', image);
    await apiClient.post(`/v1/companies/${createdCompany.companyId}/images`, formData);
  }

  return createdCompany;
};

export default createCompany;
