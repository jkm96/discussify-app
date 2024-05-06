import {AccessTokenModel} from '@/boundary/interfaces/token';
import {apiKey, internalBaseUrl} from '@/boundary/constants/appConstants';

export async function storeAccessTokenInCookie(storeTokenRequest: AccessTokenModel) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/token/store`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(storeTokenRequest),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getAccessToken() {
  try {
    const response = await fetch(`${internalBaseUrl}/api/token/retrieve`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: null,
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteAccessToken() {
  try {
    const response = await fetch(`${internalBaseUrl}/api/token/delete`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: null,
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}
