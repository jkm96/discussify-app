import { apiKey, internalBaseUrl } from '@/boundary/constants/appConstants';
import { SiteContentQueryParameters } from '@/boundary/parameters/contentQueryParameters';
import { CreateSiteContentRequest } from '@/boundary/interfaces/siteContent';
import { CustomerFeedbackRequest } from '@/boundary/interfaces/customer';

export async function createSiteContentAsync(request: CreateSiteContentRequest) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/admin/site-content/create`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateSiteContentAsync(request: CreateSiteContentRequest,contentId:number) {
  try {
    const requestBody = {
      data: request,
      contentId: contentId
    };
    const response = await fetch(`${internalBaseUrl}/api/admin/site-content/update`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchSiteContentAsync(queryParams: SiteContentQueryParameters) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/site-content/${JSON.stringify(queryParams)}`, {
      method: 'GET',
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

export async function fetchSiteContentByIdAsync(contentId: number) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/admin/site-content/${contentId}`, {
      method: 'GET',
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

export async function giveFeedbackAsync(request: CustomerFeedbackRequest) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/site-content/customer-feedback`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}