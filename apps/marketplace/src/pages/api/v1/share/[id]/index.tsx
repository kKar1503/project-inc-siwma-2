import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';

export default apiHandler().get(async (req, res) => {
  res.status(200).json(formatAPIResponse({ 'get test': 'test' }));
});
