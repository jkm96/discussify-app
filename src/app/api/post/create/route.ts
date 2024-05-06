import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import {NextRequest} from 'next/server';
import discussifyApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const config = getAxiosConfigs(request, true);
    const response = await discussifyApiClient.post('api/v1/posts/create',requestBody, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}