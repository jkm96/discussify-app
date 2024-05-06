import {apiKey, internalBaseUrl} from '@/boundary/constants/appConstants';
import {CreateUserSubscriptionRequest} from '@/boundary/interfaces/admin';

export async function toggleUserSubscription(userId: number) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/admin/user-subscriptions/toggle-subscription`, {
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

export async function createUserSubscription(createRequest: CreateUserSubscriptionRequest) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/admin/user-subscriptions/create-subscription`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(createRequest),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getUserSubscriptions(userId: string) {
  try {
    const apiUrl = `${internalBaseUrl}/api/admin/user-subscriptions/${userId}`;
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