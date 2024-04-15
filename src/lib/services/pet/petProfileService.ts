import { apiKey, internalBaseUrl } from '@/boundary/constants/appConstants';
import {
  AddPetTraitRequest,
  CreatePetRequest,
  EditPetRequest,
  UpdatePetProfileImageRequest,
} from '@/boundary/interfaces/pet';
import axios from 'axios';
import { handleApiException } from '@/helpers/responseHelpers';

export async function getPetProfiles() {
  try {
    const response = await fetch(`${internalBaseUrl}/api/pet/profile/list`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: null,
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function createPetProfile(createRequest: CreatePetRequest) {
  try {
    const formData = new FormData();
    formData.append('name', createRequest.name);
    formData.append('nickname', createRequest.nickname);
    formData.append('species', createRequest.species);
    formData.append('breed', createRequest.breed);
    formData.append('description', createRequest.description);
    formData.append('dateOfBirth', createRequest.dateOfBirth ?? '');
    formData.append('petTraits', JSON.stringify(createRequest.petTraits));

    if (createRequest.profilePicture) {
      for (let i = 0; i < createRequest.profilePicture.length; i++) {
        const file = createRequest.profilePicture[i];
        formData.append('profilePicture', file, file.name);
      }
    }

    const response = await axios.post(`${internalBaseUrl}/api/pet/create`, formData, {
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPetProfileDetails(petSlug: string) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/pet/${petSlug}`, {
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

export async function editPetProfile(editRequest: EditPetRequest) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/pet/profile/edit`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(editRequest),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function deletePetProfile(petId: number) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/pet/profile/delete`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ 'petId': petId }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function addPetTraits(addRequest: AddPetTraitRequest) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/pet/trait/create`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(addRequest),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateProfileImage(uploadRequest: UpdatePetProfileImageRequest) {
  try {
    const formData = new FormData();
    formData.append('petId', `${uploadRequest.petId}`);

    if (uploadRequest.profilePicture) {
      for (let i = 0; i < uploadRequest.profilePicture.length; i++) {
        const file = uploadRequest.profilePicture[i];
        formData.append('profilePicture', file, file.name);
      }
    }
    const response = await axios.post(`${internalBaseUrl}/api/pet/profile/update-image`, formData, {
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

