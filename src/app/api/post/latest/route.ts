import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import {NextRequest} from 'next/server';
import {getPostQueryParams} from '@/helpers/urlHelpers';
import discussifyApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const queryParams = getPostQueryParams(data.queryParams);
    const config = getAxiosConfigs(request, true,queryParams);
    const response = await discussifyApiClient.get('api/v1/posts', config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}