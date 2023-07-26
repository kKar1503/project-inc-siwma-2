import apiClient from '@/utils/api/client/apiClient';
import companies from '@/utils/api/client/zod/companies';

export type PutCompanyRequestBody = {
  name: string;
  website: string;
  bio: string | null;
};

const updateCompany = async (data: PutCompanyRequestBody, id: string, image?: File) => {
  if (!id) {
    return null;
  }

  const response = await apiClient.put(`/v1/companies/${id}`, data);
  const parsedCompany = companies.update.parse(response.data.data[0]);

  if (image) {
    const formData = new FormData();
    formData.append('file', image);
    await apiClient.put(`/v1/companies/${id}/images`, formData);
  }

  return parsedCompany;
};

export default updateCompany;
