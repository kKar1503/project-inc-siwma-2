import apiClient from '@/utils/api/client/apiClient';

export type ReturnType = {
  success: true;
} | {
  success: false;
  errorMessages: string[];
} | false;

const sendMessage = async (roomId: string, message: string) => { 

  const data = {
    message,
  };

  const response = await apiClient.post(`v1/chat/${roomId}/messages`, data);

  console.log('response', response);
};

export default sendMessage;