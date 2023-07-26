// ** API Client
import apiClient from '@/utils/api/client/apiClient';

// ** React Query
import { useQuery } from 'react-query';

// ** Types Imports
import invites from '@/utils/api/client/zod/invites';
import { PostBulkInviteRequestBody } from '@/utils/api/server/zod';

/**
 * POST Bulk Invite
 */
const useBulkInvites = (file: PostBulkInviteRequestBody) =>
  useQuery({
    queryFn: async () =>
      apiClient
        .post(`/v1/invites/bulk`, file)
        // parse data through zod to ensure data is correct
        .then((res) => res),
    enabled: !!file,
  });

export default useBulkInvites;
