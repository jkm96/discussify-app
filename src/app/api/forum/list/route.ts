import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import discussifyApiClient, {getAxiosConfigs} from '@/lib/axios/axiosClient';
import {NextRequest} from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const config = getAxiosConfigs(request,true);
    const response = await discussifyApiClient.get(`api/v1/forums`, config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}