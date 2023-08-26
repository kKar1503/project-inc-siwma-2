import apiClient from '@/utils/api/client/apiClient';

export type ReturnType =
  | {
      success: true;
    }
  | {
      success: false;
      errorMessage: string;
    }
  | false;

const sendMessage = async (roomId: string, message: string): Promise<ReturnType> => {
  const data = {
    message,
  };

  const response = await apiClient.post(`v1/chat/${roomId}/messages`, data);

  console.log('response', response);

  if (response.status !== 200) {
    return {
      success: false,
      errorMessage: `Failed to send message with status code: ${response.status}`,
    };
  }

  return {
    success: true,
  };
};

export default sendMessage;
