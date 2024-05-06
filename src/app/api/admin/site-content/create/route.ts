import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import discussifyApiClient, {getAxiosConfigs} from '@/lib/axios/axiosClient';
import {NextRequest} from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const config = getAxiosConfigs(request);
    const requestBody = await request.json();
    const response = await discussifyApiClient
      .post('api/v1/site-content', requestBody,config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}