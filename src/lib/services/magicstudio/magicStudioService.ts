import { apiKey, internalBaseUrl } from '@/boundary/constants/appConstants';
import { CreateMagicProjectRequest, SavePdfRequest } from '@/boundary/interfaces/magicStudio';
import { MagicStudioQueryParameters } from '@/boundary/parameters/magicStudioQueryParameters';

export async function createProject(createRequest: CreateMagicProjectRequest) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/magic-studio/create`, {
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

export async function fetchMagicStudioProjects(queryParams: MagicStudioQueryParameters) {
  try {
    const apiUrl = `${internalBaseUrl}/api/magic-studio/list/${JSON.stringify(queryParams)}`;
    const response = await fetch(apiUrl, {
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

export async function savePdfDocToDatabase(request: SavePdfRequest) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/magic-studio/save-pdf`, {
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

export async function getProjectDetails(projectSlug: string) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/magic-studio/${projectSlug}`, {
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

export async function deleteMagicProject(projectId: number) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/magic-studio/delete`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        projectId: projectId,
      }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}