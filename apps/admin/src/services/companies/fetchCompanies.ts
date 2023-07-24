import apiClient from '@/utils/api/client/apiClient';
import companies, { CompanyResponseBody } from '@/utils/api/client/zod/companies';

const fetchCompanies = async (id?: string | string[]): Promise<CompanyResponseBody[]> => {
  if (!id) {
    const response = await apiClient.get(`/v1/companies`);
    return companies.getAll.parse(response.data.data);
  }
  const ids = Array.isArray(id) ? id : [id];
  return Promise.all(ids.map(async (id) => {
    const response = await apiClient.get(`/v1/companies/${id}`);
    return companies.getById.parse(response.data.data[0]);
  }));
};
export default fetchCompanies;
