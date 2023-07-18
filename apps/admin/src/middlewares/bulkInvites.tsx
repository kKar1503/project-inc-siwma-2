import apiClient from '@/utils/api/client/apiClient';

const bulkInvites = async (
  fileData: [
    {
      company: string;
      website: string;
      name: string;
      mobileNumber: string;
    }
  ]
) => {
  const bulkInvitesBody = {
    fileData,
  };
  const data = await apiClient.post('/v1/invites/bulk', bulkInvitesBody);
  return data.status;
};
export default bulkInvites;
