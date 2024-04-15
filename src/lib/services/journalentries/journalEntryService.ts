import { apiKey, internalBaseUrl } from '@/boundary/constants/appConstants';
import {
  CreateJournalEntryRequest,
  UpdateJournalEntryRequest,
  UploadJournalImageRequest,
} from '@/boundary/interfaces/journal';
import axios from 'axios';
import { handleApiException } from '@/helpers/responseHelpers';
import { JournalQueryParameters } from '@/boundary/parameters/journalQueryParameters';

export async function createJournalEntry(createRequest: CreateJournalEntryRequest) {
  try {
    const formData = new FormData();
    formData.append('title', createRequest.title);
    formData.append('event', createRequest.event);
    formData.append('content', createRequest.content);
    formData.append('location', createRequest.location);
    formData.append('mood', createRequest.mood);
    formData.append('tags', createRequest.tags);
    formData.append('petIds', JSON.stringify(createRequest.petIds));

    if (createRequest.attachments) {
      for (let i = 0; i < createRequest.attachments.length; i++) {
        const file = createRequest.attachments[i];
        formData.append(`attachment${i}`, file, file.name);
      }
    }

    const response = await axios.post(`${internalBaseUrl}/api/journal-entry/create`, formData, {
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    return handleApiException(error);
  }
}

export async function uploadJournalAttachments(uploadRequest: UploadJournalImageRequest) {
  try {
    const formData = new FormData();
    formData.append('journalId', `${uploadRequest.journalId}`);

    if (uploadRequest.attachments) {
      for (let i = 0; i < uploadRequest.attachments.length; i++) {
        const file = uploadRequest.attachments[i];
        formData.append(`attachment${i}`, file, file.name);
      }
    }

    const response = await axios.post(`${internalBaseUrl}/api/journal-entry/attachments/create`, formData, {
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    return handleApiException(error);
  }
}

export async function getJournalEntries(queryParams: JournalQueryParameters) {
  try {
    const apiUrl = `${internalBaseUrl}/api/journal-entry/list/${JSON.stringify(queryParams)}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      cache: 'no-store',
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

export async function updateJournalEntry(updateRequest: UpdateJournalEntryRequest) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/journal-entry/edit`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateRequest),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteJournal(journalId: number) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/journal-entry/delete`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        journalId: journalId,
      }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getJournalEntryDetails(journalSlug: string) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/journal-entry/${journalSlug}`, {
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

export async function getJournalEntryAttachmentBuffers(journalId: number) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/journal-entry/attachments/${journalId}`, {
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