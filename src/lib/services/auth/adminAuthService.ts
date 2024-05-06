import {apiKey, internalBaseUrl} from '@/boundary/constants/appConstants';
import {LoginUserRequest} from '@/boundary/interfaces/auth';

export async function loginAdmin(loginRequest: LoginUserRequest) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/auth/admin/login`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}