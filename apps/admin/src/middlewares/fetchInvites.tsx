import apiClient from '@/utils/api/client/apiClient';
import invites from '@/utils/api/client/zod/invites';

const fetchInvites = async () => {
  const response = await apiClient.get(`/v1/invites/`);
  const parsedInvites = invites.getAll.parse(response.data.data);

  return parsedInvites;
};

export default fetchInvites;
