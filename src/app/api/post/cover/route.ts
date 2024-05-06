import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import {NextRequest} from 'next/server';
import discussifyApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";

export async function GET(request: NextRequest) {
  try {
    const config = getAxiosConfigs(request, false);
    const response = await discussifyApiClient.get('api/v1/posts/cover-posts', config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}