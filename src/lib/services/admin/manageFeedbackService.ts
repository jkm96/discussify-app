import {apiKey, internalBaseUrl} from '@/boundary/constants/appConstants';

export async function fetchCustomerFeedbackAsync() {
  try {
    const apiUrl = `${internalBaseUrl}/api/admin/customer-feedback/list`;
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