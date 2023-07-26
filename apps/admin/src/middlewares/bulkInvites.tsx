import apiClient from '@/utils/api/client/apiClient';
import { PostBulkInviteRequestBody } from '@/utils/api/server/zod';
// import invites from '@/utils/api/client/zod/invites';

const bulkInvites = async (fileDetails: PostBulkInviteRequestBody) => {
  if (fileDetails.length === 0) {
    // console.log(fileDetails);
    return false;
  }
  // console.log(fileDetails);
  const data = await apiClient.post('/v1/invites/bulk', fileDetails);
  // console.log(data);

  return data.status;

};
export default bulkInvites;
