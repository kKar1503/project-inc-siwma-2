import apiClient from '@/utils/api/client/apiClient'; 
import users from '@/utils/api/client/zod/users'; 
import companies from '@/utils/api/client/zod/companies'; 
 
const fetchCompany = async (uuid: string) => { 
  if (uuid) { 
    const response = await apiClient.get(`/v1/users/${uuid}`); 
    const parsedUser = users.getById.parse(response.data.data[0]); 
    const companyId = parsedUser.company.id; 
    const companyResponse = await apiClient.get(`/v1/companies/${companyId}`); 
    const parsedCompany = companies.getById.parse(companyResponse.data.data[0]); 
    const userWithCompanyName = { 
      ...parsedUser, 
      companyName: parsedCompany.name, 
    }; 
    return userWithCompanyName; 
  } 
  return null; 
}; 
export default fetchCompany;