import apiClient from '@/utils/api/client/apiClient';

const deleteCategories = async (ids: string | string[]) => {
  const idsToDelete = Array.isArray(ids) ? ids : [ids];
  const responses = await Promise.all(
    idsToDelete.map((id) => apiClient.delete(`/v1/categories/${id}`))
  );

  return responses.every((response) => response.status === 200);
};

export default deleteCategories;
