import { NextRequest } from 'next/server';
import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import adminApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';

export async function POST(request: NextRequest) {
  try {
    const config = getAxiosConfigs(request);
    const requestBody = await request.json();
    const response = await adminApiClient
      .post('api/v1/admin/user-subscriptions', requestBody, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}
