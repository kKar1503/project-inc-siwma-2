import apiClient from '@/utils/api/client/apiClient'

const resetpassword = async (password: string, token: string, uuid: string) => {

		const passwordchange = {
		'newPassword': password,
		'token' : token
		
		}

		const data = await apiClient.post(`/v1/users/${uuid}/reset-password`, passwordchange)
  	return data.status 

}

export default resetpassword