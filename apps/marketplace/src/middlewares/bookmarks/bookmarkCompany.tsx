import apiClient from '@/utils/api/client/apiClient';

const bookmarkCompany = async (companyID: string) => {
  const response = await apiClient.patch(`/v1/companies/${companyID}/bookmark`);

  return response.data;
};

export default bookmarkCompany;
