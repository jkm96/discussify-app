import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import discussifyApiClient from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const response = await discussifyApiClient
      .post('api/v1/user/login', requestBody);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}