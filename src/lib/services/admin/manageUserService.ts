import {apiKey, internalBaseUrl} from '@/boundary/constants/appConstants';
import {UserQueryParameters} from '@/boundary/parameters/userQueryParameters';

export async function getUsers(queryParams: UserQueryParameters) {
  try {
    const apiUrl = `${internalBaseUrl}/api/admin/manage-users/list/${JSON.stringify(queryParams)}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'Content-type': 'application/json',
      },
      body: null,
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function toggleUser(userId: number) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/admin/manage-users/toggle`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ 'userId': userId }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getUserById(userId: string) {
  try {
    const apiUrl = `${internalBaseUrl}/api/admin/manage-users/${userId}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'Content-type': 'application/json',
      },
      body: null,
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}