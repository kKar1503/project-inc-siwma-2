import apiClient from '@/utils/api/client/apiClient';

const deleteAdvertisement = async (id: string): Promise<void> => apiClient.delete(`/v1/advertisements/${id}`);

export default deleteAdvertisement;
