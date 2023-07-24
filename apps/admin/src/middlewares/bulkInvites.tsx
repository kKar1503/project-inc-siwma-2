import apiClient from '@/utils/api/client/apiClient';
import { PostBulkInviteRequestBody } from '@/utils/api/server/zod';

const bulkInvites = async (fileData: PostBulkInviteRequestBody) => {
  const data = await apiClient.post('/v1/invites/bulk', fileData);
  return data.status;
};
export default bulkInvites;
