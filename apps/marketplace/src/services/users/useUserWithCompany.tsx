// ** API Client Import
import apiClient from '@/utils/api/client/apiClient';

// ** Zod Imports
import users from '@/utils/api/client/zod/users';
import companies from '@/utils/api/client/zod/companies';

// ** React Query Import
import { useQuery } from 'react-query';

/**
 * Fetches a user object with the company name
 */
const useUserWithCompany = (uuid: string) =>
  useQuery({
    queryFn: async () => {
      const response = await apiClient.get(`/v1/users/${uuid}`);
      const parsedUser = users.getById.parse(response.data.data[0]);
      const companyId = parsedUser.company;
      const companyResponse = await apiClient.get(`/v1/companies/${companyId}`);
      const parsedCompany = companies.getById.parse(companyResponse.data.data[0]);
      const userWithCompanyName = {
        ...parsedUser,
        companyName: parsedCompany.name,
      };
      return userWithCompanyName;
    },
    queryKey: ['userWithCompanyName', uuid],
  });

export default useUserWithCompany;
